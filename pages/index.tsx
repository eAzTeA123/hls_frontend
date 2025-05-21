// pages/index.tsx
import { useEffect, useState } from 'react';
import { parseM3U } from '@/utils/parseM3U';
import PlayerModal from '@/components/PlayerModal';

export default function Home() {
  const [channels, setChannels] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<any>(null);

  useEffect(() => {
    fetch('/api/playlist')
      .then(res => res.json())
      .then(setChannels);
  }, []);

  const grouped = channels.reduce((groups: any, ch: any) => {
    const group = ch.group || 'Other';
    if (!groups[group]) groups[group] = [];
    if (!search || ch.name.toLowerCase().includes(search.toLowerCase())) {
      groups[group].push(ch);
    }
    return groups;
  }, {});

  return (
    <main className="p-4 bg-black text-white min-h-screen">
      <h1 className="text-3xl mb-4">📺 IPTV Channel List</h1>
      <input
        type="text"
        placeholder="🔍 Kanal suchen..."
        className="mb-6 p-2 w-full rounded bg-gray-800 text-white"
        onChange={e => setSearch(e.target.value)}
      />
      {Object.keys(grouped).map(group => (
        <div key={group} className="mb-6">
          <h2 className="text-xl font-bold mb-2">{group}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {grouped[group].map((channel: any, i: number) => (
              <div
                key={i}
                className="bg-gray-800 p-3 rounded hover:bg-gray-700 cursor-pointer"
                onClick={() => setSelectedChannel(channel)}
              >
                <img src={channel.logo} alt={channel.name} className="w-full h-24 object-contain mb-2" />
                <p>{channel.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      {selectedChannel && (
        <PlayerModal channel={selectedChannel} onClose={() => setSelectedChannel(null)} />
      )}
    </main>
  );
}
