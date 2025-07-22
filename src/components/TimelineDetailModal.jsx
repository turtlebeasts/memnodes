import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

export default function TimelineDetailsModal({ timeline, onClose, onDelete }) {
  if (!timeline) return null;
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute right-0 top-0 h-full w-full max-w-md bg-zinc-900 text-white p-6 shadow-lg overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {timeline.title.toUpperCase()}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <RxCross1 />
            </button>
          </div>

          <div className="space-y-4 text-sm text-gray-300">
            <div>
              <strong className="text-white">ID:</strong> {timeline.id}
            </div>
            <div>
              <strong className="text-white">Privacy:</strong>{" "}
              {timeline.is_public ? "Public" : "Private"}
            </div>
            <div>
              <strong className="text-white">Created At:</strong>{" "}
              {new Date(timeline.created_at).toLocaleString()}
            </div>
            <div>
              <strong className="text-white">Description:</strong>
              <p className="mt-1">
                {timeline.description || "No description available."}
              </p>
            </div>
            <div className="pt-6">
              {confirmDelete ? (
                <div className="flex items-center gap-4">
                  <span>Are you sure?</span>
                  <button
                    onClick={() => onDelete(timeline.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Delete Timeline
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
