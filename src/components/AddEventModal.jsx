import { useState } from "react";

export default function AddEventModal({
  onClose,
  onSubmit,
  previous_event_id,
  previousEventTitle,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, date, previous_event_id });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl mb-4 font-bold text-white">Add Event</h2>

        {previous_event_id && (
          <p className="text-sm text-gray-400 mb-2">
            Inserting after event:{" "}
            <span className="font-semibold">{previousEventTitle}</span>
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 bg-black border border-gray-600 rounded-lg text-white"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-3 bg-black border border-gray-600 rounded-lg text-white"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-3 bg-black border border-gray-600 rounded-lg text-white"
          />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="text-gray-400">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
