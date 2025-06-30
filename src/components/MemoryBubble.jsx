import React from "react";
import { motion } from "framer-motion";

export default function MemoryBubble({ memory }) {
  const color = memory.future ? "#858585" : "#ffffff";

  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -10 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative w-28 h-28 flex items-center justify-center rounded-full"
      style={{
        background: `radial-gradient(circle at 30% 30%, ${color}33, transparent 70%)`,
        border: `2px solid ${color}`,
        textAlign: "center",
      }}
    >
      <span className="text-xs text-white text-center px-2">
        {memory.title}
      </span>
    </motion.div>
  );
}
