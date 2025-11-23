import Nav from '../components/Nav';
export default function Home(){ 
  return (
    <>
      <Nav />
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Bienvenido a tu Leaderboard</h1>
        <p>Usa el menú para navegar entre leaderboards, calendario y el panel admin para introducir resultados.</p>
      </main>
    </>
  )
}
