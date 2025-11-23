import Nav from '../../components/Nav';
import { supabase } from '../../lib/supabase';

export default function Player({ player, ratings, badges, recent }) {
  if (!player) return <div><Nav /><main className="p-4">Player not found</main></div>;
  return (
    <>
      <Nav />
      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold">{player.name}</h2>
          <p>Country: {player.country || '-'}</p>
          <h3 className="mt-4 font-semibold">Ratings</h3>
          <ul>
            {ratings.map(r=>(
              <li key={r.leaderboard_id}>{r.leaderboard_id}: {r.elo} (W:{r.wins} L:{r.losses})</li>
            ))}
          </ul>
          <h3 className="mt-4 font-semibold">Badges</h3>
          <ul>
            {badges.map(b=> <li key={b.id}>{b.name}</li>)}
          </ul>
          <h3 className="mt-4 font-semibold">Recent matches</h3>
          <ul>
            {recent.map(m=> <li key={m.id}>{m.played_at} - vs {m.player1 === player.id ? m.player2_name : m.player1_name} - winner: {m.winner_name}</li>)}
          </ul>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const id = params.id;
  const { data: player } = await supabase.from('players').select('*').eq('id', id).single();
  const { data: ratings } = await supabase.from('player_ratings').select('*').eq('player_id', id);
  const { data: pb } = await supabase.from('player_badges').select('*, badges(*)').eq('player_id', id);
  const badges = (pb || []).map(x => x.badges);
  const { data: recent } = await supabase.rpc('player_recent_matches', { p_id: id }).catch(()=>({ data: [] }));
  return { props: { player: player || null, ratings: ratings || [], badges, recent: recent || [] } };
}
