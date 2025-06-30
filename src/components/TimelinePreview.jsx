import React, { useRef } from "react";
import { motion } from "framer-motion";
import MemoryBubble from "./MemoryBubble";

const sampleMemories = [
  { title: "Started College", date: "2022-08-01", happiness: 8, future: false },
  {
    title: "Won Coding Contest",
    date: "2023-02-12",
    happiness: 10,
    future: false,
  },
  {
    title: "Graduate & Get a Job",
    date: "2025-06-01",
    happiness: 9,
    future: true,
  },
  { title: "Travel Europe", date: "2026-04-21", happiness: null, future: true },
  {
    title: "Switch to a high paying job",
    date: "2029-10-21",
    happiness: null,
    future: true,
  },
  {
    title: "Build a Startup",
    date: "2031-08-30",
    happiness: null,
    future: true,
  },
];

export default function TimelinePreview() {
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
      className="overflow-x-auto scrollbar-hide px-10 py-14 cursor-grab select-none"
    >
      <div className="flex items-center relative space-x-[10rem] min-w-max">
        {sampleMemories.map((mem, idx) => (
          <div key={idx} className="relative flex flex-col items-center">
            {/* Bubble Node with view-aware animation */}
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <MemoryBubble memory={mem} />
            </motion.div>

            {/* Line to next bubble with grow effect on view */}
            {idx < sampleMemories.length - 1 && (
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

            {/* Date Label */}
            <span className="mt-3 text-sm text-gray-400">{mem.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
