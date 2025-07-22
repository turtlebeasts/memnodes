import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import CreateTimelineCard from "../components/CreateTimelineCard";
import CreateTimelineModal from "../components/CreateTimelineModal";
import TimelineDetailsModal from "../components/TimelineDetailModal";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [timelines, setTimelines] = useState([]);
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTimelines = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:5000/api/timelines/${user.id}`);
      const data = await res.json();
      setTimelines(data);
    } catch (err) {
      console.error("Error fetching timelines:", err);
    }
  }, [user]);

  const handleDeleteTimeline = async (timelineId) => {
    console.log("Deleting timeline");
    try {
      const res = await fetch(
        `http://localhost:5000/api/timelines/${timelineId}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json();
      console.log(result);

      console.log("deleted");
      setTimelines((prev) => prev.filter((t) => t.id !== timelineId));
      setSelectedTimeline(null); // close modal if open
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    if (!showModal) {
      fetchTimelines(); // fetch only when modal is closed
    }
  }, [showModal, fetchTimelines]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Your Timelines</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <CreateTimelineCard onClick={() => setShowModal(true)} />
        {showModal && (
          <CreateTimelineModal onClose={() => setShowModal(false)} />
        )}
        {timelines.map((timeline) => (
          <motion.div
            key={timeline.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition"
          >
            <h2 className="text-xl font-semibold text-white mb-2">
              {timeline.title.toUpperCase()}
            </h2>
            <p className="text-gray-400 mb-2">
              {timeline.is_public ? "Public" : "Private"}
            </p>
            <span className="text-xs text-gray-500 block mb-4">
              Created on {new Date(timeline.created_at).toLocaleDateString()}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedTimeline(timeline)}
                className="bg-white border-2 border-white text-black px-3 py-1 rounded hover:bg-gray-200 text-sm transition"
              >
                View Details
              </button>
              <button
                onClick={() => navigate(`/dashboard/${timeline.id}`)}
                className="text-white border-2 border-white px-3 py-1 rounded-sm hover:bg-gray-200 hover:text-black text-sm transition-all duration-300"
              >
                Open
              </button>
            </div>
          </motion.div>
        ))}

        {selectedTimeline && (
          <TimelineDetailsModal
            timeline={selectedTimeline}
            onClose={() => setSelectedTimeline(null)}
            onDelete={handleDeleteTimeline}
          />
        )}
      </div>
    </div>
  );
}
