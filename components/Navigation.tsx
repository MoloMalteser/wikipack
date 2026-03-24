import { motion } from "framer-motion";
import { useState } from "react";

const tabs = ["Home", "Collection", "Battle"];

export default function JellyTabBar({ activeTab, setActiveTab }) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
      <motion.div 
        className="flex items-center bg-black p-2 rounded-full shadow-2xl gap-2"
        whileTap={{ scale: 0.95 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative px-6 py-2 text-sm font-medium transition-colors"
          >
            {activeTab === tab && (
              <motion.div
                layoutId="bubble"
                className="absolute inset-0 bg-white rounded-full"
                transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
              />
            )}
            <span className={`relative z-10 ${activeTab === tab ? "text-black" : "text-white"}`}>
              {tab}
            </span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}
