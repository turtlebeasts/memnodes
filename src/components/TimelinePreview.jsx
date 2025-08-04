import React, { useRef } from "react";
import { motion } from "framer-motion";
import MemoryBubble from "./MemoryBubble";

export default function TimelinePreview({ memories = [] }) {
  const containerRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - containerRef.current.offsetLeft;
    scrollLeft = containerRef.current.scrollLeft;
    containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    isDown = false;
    containerRef.current.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    isDown = false;
    containerRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className="overflow-x-auto scrollbar-hide px-6 py-8 cursor-grab select-none"
    >
      <div className="flex items-center relative space-x-[10rem] min-w-max">
        {memories.map((mem, idx) => (
          <div key={idx} className="relative flex flex-col items-center">
            {/* Memory Bubble Node */}
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <MemoryBubble memory={mem} />
            </motion.div>

            {/* Connecting Line to Next Bubble */}
            {idx < memories.length - 1 && (
              <motion.div
                whileInView={{ width: "10rem" }}
                initial={{ width: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 + 0.3 }}
                viewport={{ once: true, amount: 0.5 }}
                className={`absolute top-1/2 left-full h-1 ${
                  mem.future ? "border-t-2 border-dashed" : "border-t-2"
                }`}
                style={{
                  borderColor: "#8884d8",
                  transform: "translateY(-50%)",
                }}
              />
            )}

            {/* Date below each bubble */}
            <span className="mt-3 text-sm text-gray-400">
              {new Date(mem.date).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
