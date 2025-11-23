import Nav from '../../components/Nav';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function PlayersList({ players }) {
  return (
    <>
      <Nav />
      <main className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Players</h2>
        <ul>
          {players.map(p=>(
            <li key={p.id}><Link href={'/players/'+p.id}><a>{p.name}</a></Link></li>
          ))}
        </ul>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const { data } = await supabase.from('players').select('*').order('name');
  return { props: { players: data || [] } };
}
