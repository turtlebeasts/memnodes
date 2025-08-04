import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardLayout from "./components/DashboardLayout";
import MyTimelines from "./pages/MyTimelines";
import Settings from "./pages/Settings";
import TimelineEditor from "./pages/TimelineEditor";
import TimelineFeed from "./pages/TimelineFeed";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<MyTimelines />} />
          <Route path="feed" element={<TimelineFeed />} />
          <Route path="settings" element={<Settings />} />
          <Route path=":id" element={<TimelineEditor />} />
        </Route>
      </Routes>
    </Router>
  );
}
