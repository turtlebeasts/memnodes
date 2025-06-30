import React, { useState } from "react";
import { motion } from "framer-motion";
import CreateTimelineCard from "../components/CreateTimelineCard";
import CreateTimelineModal from "../components/CreateTimelineModal";

// Example timelines data (you can replace this with actual fetched data)
const timelines = [
  {
    id: 1,
    title: "College Life",
    description: "My journey through college from 2022 to 2025.",
    createdAt: "2022-08-01",
  },
  {
    id: 2,
    title: "Career Goals",
    description: "Steps towards my dream job and professional growth.",
    createdAt: "2023-03-14",
  },
  {
    id: 3,
    title: "Travel Dreams",
    description: "All the places I dream of visiting.",
    createdAt: "2024-01-10",
  },
];

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Your Timelines</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <CreateTimelineCard onClick={() => setShowModal(true)} />
        {showModal && (
          <CreateTimelineModal onClose={() => setShowModal(false)} />
        )}
        {timelines.map((timeline, key) => (
          <motion.div
            key={timeline.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition"
          >
            <h2 className="text-xl font-semibold text-white mb-2">
              {timeline.title}
            </h2>
            <p className="text-gray-400 mb-2">{timeline.description}</p>
            <span className="text-xs text-gray-500">
              Created on {timeline.createdAt}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
