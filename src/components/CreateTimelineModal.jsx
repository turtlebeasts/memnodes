// CreateTimelineModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross1 } from "react-icons/rx";

export default function CreateTimelineModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You're not logged in!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/timelines/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          title,
          isPublic,
        }),
      });

      const data = await res.json();
      onClose(); // close modal
    } catch (err) {
      console.error("Timeline creation error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-zinc-900 p-6 rounded-2xl w-full max-w-md shadow-lg text-white relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
          >
            <RxCross1 />
          </button>

          <h2 className="text-xl font-semibold mb-4">Create New Timeline</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-1">Timeline Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="public"
                checked={isPublic}
                onChange={() => setIsPublic((prev) => !prev)}
                className="accent-white"
              />
              <label htmlFor="public" className="text-sm">
                Make this timeline public
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Create Timeline
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
