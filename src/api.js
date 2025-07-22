const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchEvents = async (timelineId) => {
  const res = await fetch(`${API_BASE}/events/${timelineId}`);
  return res.json();
};

export const createEvent = async (timelineId, eventData) => {
  const res = await fetch(`${API_BASE}/events/${timelineId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  const result = await res.json();
  return result.event;
};
