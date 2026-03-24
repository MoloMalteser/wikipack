import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function BattleRoom({ roomId, userProfile }) {
  const [gameState, setGameState] = useState('waiting');
  const [opponent, setOpponent] = useState(null);

  useEffect(() => {
    // Channel abonnieren
    const channel = supabase.channel(`room_${roomId}`, {
      config: { broadcast: { self: true } }
    });

    channel
      .on('broadcast', { event: 'player_joined' }, ({ payload }) => {
        if (payload.userId !== userProfile.id) {
          setOpponent(payload.userId);
          setGameState('ready');
          // Antworte dem Gegner, dass du auch da bist
          channel.send({ type: 'broadcast', event: 'player_present', payload: { userId: userProfile.id } });
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          channel.send({ type: 'broadcast', event: 'player_joined', payload: { userId: userProfile.id } });
        }
      });

    return () => { supabase.removeChannel(channel); };
  }, [roomId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Battle Room: {roomId}</h2>
      {gameState === 'waiting' ? (
        <p className="animate-pulse">Warten auf Gegner...</p>
      ) : (
        <div className="text-center">
          <p>Gegner gefunden! Bereite Kampf vor...</p>
          {/* Hier kommt die Kampf-UI hin */}
        </div>
      )}
    </div>
  );
}
