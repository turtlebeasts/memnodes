import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TimelinePreview from "../components/TimelinePreview";

export default function TimelineFeed() {
  const [timelines, setTimelines] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/timelines");
        const data = await res.json();
        if (data.success) setTimelines(data.timelines);
      } catch (err) {
        console.error("Failed to fetch timelines:", err);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">🌍 Explore Public Timelines</h1>

      {timelines.length === 0 ? (
        <p className="text-gray-400">No public timelines found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-10">
          {timelines.map((timeline) => (
            <div
              key={timeline.id}
              className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-semibold text-white mb-1">
                {timeline.title}
              </h2>
              <p className="text-sm text-gray-400 mb-1 italic">
                by {timeline.author}
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Created on {new Date(timeline.created_at).toLocaleDateString()}
              </p>

              <TimelinePreview memories={timeline.previewEvents} />

              <Link
                to={`/dashboard/${timeline.id}`}
                className="inline-block mt-4 text-sm bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                View Full Timeline →
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
