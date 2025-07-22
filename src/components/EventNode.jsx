import { motion } from "framer-motion";

export default function EventNode({ event, onAddNext }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative bg-zinc-800 border border-zinc-700 text-white p-5 rounded-xl min-w-[200px] shadow-md"
    >
      <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
      {event.description && (
        <p className="text-sm text-gray-300 mb-2">{event.description}</p>
      )}
      <p className="text-xs text-gray-500">
        {new Date(event.date).toLocaleDateString()}
      </p>

      {onAddNext && (
        <button
          onClick={onAddNext}
          className="mt-4 text-sm border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition-all"
        >
          + Add Next
        </button>
      )}
    </motion.div>
  );
}
