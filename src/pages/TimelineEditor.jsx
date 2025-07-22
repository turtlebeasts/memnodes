import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEvents, createEvent } from "../api";
import EventNode from "../components/EventNode";
import AddEventModal from "../components/AddEventModal";

export default function TimelineEditor() {
  const { id: timelineId } = useParams();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await fetchEvents(timelineId);
      setEvents(data);
    })();
  }, [timelineId]);

  const handleCreate = async (eventData) => {
    const newEvent = await createEvent(timelineId, eventData);
    setEvents((prev) => [...prev, newEvent]);
    setShowModal(false);
  };

  return (
    <div className="relative min-h-screen p-10 text-white">
      <h1 className="text-2xl font-bold mb-6">Editing Timeline</h1>

      {events.length === 0 ? (
        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-black px-6 py-3 rounded shadow"
        >
          + Add your first event
        </button>
      ) : (
        <div className="flex gap-6 items-center">
          {events.map((event, index) => (
            <div key={event.id} className="flex items-center">
              <EventNode event={event} onAddNext={() => setShowModal(true)} />
              {index < events.length - 1 && (
                <div className="w-10 h-1 bg-white" />
              )}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <AddEventModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreate}
        />
      )}
    </div>
  );
}
