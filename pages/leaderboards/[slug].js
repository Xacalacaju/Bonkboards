import { useRouter } from 'next/router';
import Nav from '../../components/Nav';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function Leaderboard({ ratings, leaderboard }) {
  return (
    <>
      <Nav />
      <main className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">{leaderboard?.name || 'Leaderboard'}</h2>
        <table className="w-full bg-white rounded shadow">
          <thead><tr className="text-left p-2"><th>#</th><th>Player</th><th>ELO</th><th>W</th><th>L</th></tr></thead>
          <tbody>
            {ratings.map((r, i) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{i+1}</td>
                <td className="p-2"><Link href={'/players/'+r.player_id}><a>{r.name || 'Player'}</a></Link></td>
                <td className="p-2">{r.elo}</td>
                <td className="p-2">{r.wins}</td>
                <td className="p-2">{r.losses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const slug = params.slug;
  const { data: lb } = await supabase
    .from('leaderboards')
    .select('*')
    .eq('id', slug)
    .limit(1)
    .single();
  const { data: ratings } = await supabase
    .from('player_ratings')
    .select('*, players (name)')
    .eq('leaderboard_id', slug)
    .order('elo', { ascending: false });
  const rows = (ratings || []).map(r => ({ ...r, name: r.players?.name, player_id: r.player_id }));
  return { props: { ratings: rows, leaderboard: lb || { name: slug } } };
}
