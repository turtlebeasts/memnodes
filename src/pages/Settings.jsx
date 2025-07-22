import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

export default function Settings() {
  const [name, setName] = useState("Alex");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name && !bio && !password && isPrivate === undefined) {
      toast.error("Please fill at least one field to update.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/settings/update`,
        {
          name,
          bio,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      const message =
        err.response?.data?.error || "Something went wrong. Try again.";
      toast.error(message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto p-6 bg-white/5 border border-white/10 rounded-xl text-white shadow"
    >
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            className="w-full p-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm mb-1">Bio</label>
          <textarea
            className="w-full p-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us a bit about yourself"
          ></textarea>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-1">New Password</label>
          <input
            type="password"
            className="w-full p-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Save Changes
        </button>
      </form>
    </motion.div>
  );
}
