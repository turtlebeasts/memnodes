import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa6";

export default function CreateTimelineCard({ onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer bg-white/5 border border-white/10 text-white rounded-xl p-6 flex flex-col items-center justify-center transition hover:bg-white/10"
    >
      <FaPlus className="w-8 h-8 mb-2 text-white" />
      <span className="font-medium text-sm">Create New Timeline</span>
    </motion.div>
  );
}
