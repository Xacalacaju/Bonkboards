import { getServerSupabase } from '../../lib/supabase';
import { calculateNewRatings } from '../../utils/elo';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { player1, player2, winner, leaderboard } = req.body;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return res.status(500).json({ message: 'Missing service role key on server' });

  const supa = getServerSupabase(serviceKey);

  try {
    // fetch current ratings or create default
    let { data: r1 } = await supa.from('player_ratings').select('*').eq('player_id', player1).eq('leaderboard_id', leaderboard).single().catch(()=>({ data: null }));
    let { data: r2 } = await supa.from('player_ratings').select('*').eq('player_id', player2).eq('leaderboard_id', leaderboard).single().catch(()=>({ data: null }));

    if (!r1) {
      const ins = await supa.from('player_ratings').insert([{ player_id: player1, leaderboard_id: leaderboard, elo: 1000 }]);
      r1 = ins.data[0];
    }
    if (!r2) {
      const ins2 = await supa.from('player_ratings').insert([{ player_id: player2, leaderboard_id: leaderboard, elo: 1000 }]);
      r2 = ins2.data[0];
    }

    const a = r1.elo, b = r2.elo;
    let win = null;
    if (winner === 'A') win = 'A';
    else if (winner === 'B') win = 'B';
    else win = 'D';

    const { newA, newB } = calculateNewRatings(a, b, win === 'A' ? 'A' : (win === 'B' ? 'B' : 'D'));

    // update ratings
    await supa.from('player_ratings').update({
      elo: newA,
      wins: (r1.wins || 0) + (win === 'A' ? 1 : 0),
      losses: (r1.losses || 0) + (win === 'B' ? 1 : 0),
      games_played: (r1.games_played || 0) + 1,
      updated_at: new Date().toISOString()
    }).eq('id', r1.id);

    await supa.from('player_ratings').update({
      elo: newB,
      wins: (r2.wins || 0) + (win === 'B' ? 1 : 0),
      losses: (r2.losses || 0) + (win === 'A' ? 1 : 0),
      games_played: (r2.games_played || 0) + 1,
      updated_at: new Date().toISOString()
    }).eq('id', r2.id);

    // insert match result
    await supa.from('match_results').insert([{
      player1: player1,
      player2: player2,
      winner: win === 'A' ? player1 : (win === 'B' ? player2 : null),
      leaderboard_id: leaderboard
    }]);

    return res.json({ message: 'ELO updated' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error updating' });
  }
}
