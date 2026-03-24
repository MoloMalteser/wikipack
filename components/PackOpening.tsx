import { useState } from "react";
import { motion } from "framer-motion";

export default function PackOpening({ cards, onComplete }) {
  const [revealed, setRevealed] = useState<number[]>([]);

  const handleReveal = (index: number) => {
    if (!revealed.includes(index)) {
      setRevealed([...revealed, index]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-8">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          onClick={() => handleReveal(i)}
          className="aspect-[2/3] relative cursor-pointer"
          animate={{ rotateY: revealed.includes(i) ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Back (Black/Apple Style) */}
          <div className="absolute inset-0 bg-black border-2 border-white rounded-xl flex items-center justify-center text-white font-bold">
            Wiki
          </div>
          {/* Front (Card Details) */}
          <div 
            className="absolute inset-0 bg-white border-2 border-black rounded-xl p-2 text-black"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <h3 className="text-[10px] font-bold uppercase">{card.title}</h3>
            <p className="text-xs mt-2">ATK: {card.power} / DEF: {card.defense}</p>
          </div>
        </motion.div>
      ))}
      {revealed.length === 5 && (
        <button onClick={onComplete} className="col-span-2 mt-4 bg-black text-white p-3 rounded-lg">
          In Kollektion speichern
        </button>
      )}
    </div>
  );
}
