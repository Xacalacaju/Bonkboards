import Nav from '../../components/Nav';
import { supabase } from '../../lib/supabase';
import { useState } from 'react';

export default function AdminResults({ players, leaderboards }) {
  const [p1, setP1] = useState(players[0]?.id || '');
  const [p2, setP2] = useState(players[1]?.id || '');
  const [winner, setWinner] = useState('');
  const [lb, setLb] = useState(leaderboards[0]?.id || 'classic');
  const [msg, setMsg] = useState('');

  async function submit(e) {
    e.preventDefault();
    const res = await fetch('/api/result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player1: p1, player2: p2, winner, leaderboard: lb })
    });
    const data = await res.json();
    setMsg(data.message || 'done');
  }

  return (
    <>
      <Nav />
      <main className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Admin - Introducir Resultado</h2>
        <form onSubmit={submit} className="bg-white p-4 rounded shadow">
          <label>Jugador 1
            <select value={p1} onChange={e=>setP1(e.target.value)} className="block mb-2">
              {players.map(p=> <option value={p.id} key={p.id}>{p.name}</option>)}
            </select>
          </label>
          <label>Jugador 2
            <select value={p2} onChange={e=>setP2(e.target.value)} className="block mb-2">
              {players.map(p=> <option value={p.id} key={p.id}>{p.name}</option>)}
            </select>
          </label>
          <label>Ganador
            <select value={winner} onChange={e=>setWinner(e.target.value)} className="block mb-2">
              <option value="">-- select --</option>
              <option value="A">Jugador 1</option>
              <option value="B">Jugador 2</option>
              <option value="D">Draw</option>
            </select>
          </label>
          <label>Leaderboard
            <select value={lb} onChange={e=>setLb(e.target.value)} className="block mb-2">
              {leaderboards.map(l=> <option value={l.id} key={l.id}>{l.name}</option>)}
            </select>
          </label>
          <button className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded">Enviar</button>
          <div className="mt-2 text-sm">{msg}</div>
        </form>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const { data: players } = await supabase.from('players').select('*').order('name');
  const { data: leaderboards } = await supabase.from('leaderboards').select('*').order('name');
  return { props: { players: players || [], leaderboards: leaderboards || [] } };
}
