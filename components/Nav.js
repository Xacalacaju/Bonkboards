import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
  const [openPrimary, setOpenPrimary] = useState(false);
  const [openSecondary, setOpenSecondary] = useState(false);
  return (
    <nav className="p-4 bg-white shadow-sm mb-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/"><a className="font-bold">My Leaderboards</a></Link>
          <Link href="/leaderboards/exp"><a className="px-2">EXP leaderboard</a></Link>

          <div>
            <button onClick={()=>setOpenPrimary(!openPrimary)} className="px-2">Primary Leaderboards ▾</button>
            {openPrimary && (
              <div className="absolute mt-10 bg-white p-2 border rounded shadow">
                <Link href="/leaderboards/classic"><a className="block px-2">Classic ELO</a></Link>
                <Link href="/leaderboards/da"><a className="block px-2">DA ELO</a></Link>
                <Link href="/leaderboards/arrows"><a className="block px-2">Arrows ELO</a></Link>
                <Link href="/leaderboards/grapple"><a className="block px-2">Grapple ELO</a></Link>
              </div>
            )}
          </div>

          <div>
            <button onClick={()=>setOpenSecondary(!openSecondary)} className="px-2">Secondary Leaderboards ▾</button>
            {openSecondary && (
              <div className="absolute mt-10 bg-white p-2 border rounded shadow">
                <Link href="/leaderboards/vtol"><a className="block px-2">VTOL</a></Link>
                <Link href="/leaderboards/footy"><a className="block px-2">Footy</a></Link>
                <Link href="/leaderboards/wdb"><a className="block px-2">WDB</a></Link>
                <Link href="/leaderboards/flats"><a className="block px-2">Flats</a></Link>
                <Link href="/leaderboards/parkour"><a className="block px-2">Parkour</a></Link>
              </div>
            )}
          </div>

          <Link href="/calendar"><a className="px-2">Event Calendar</a></Link>
          <Link href="/players"><a className="px-2">Player Profiles</a></Link>
        </div>

        <div>
          <Link href="/admin/results"><a className="px-2 bg-indigo-600 text-white rounded px-3 py-1">Admin</a></Link>
        </div>
      </div>
    </nav>
  );
}
