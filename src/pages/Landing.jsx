import { Link } from "react-router-dom";
import { ReactTyped as Typed } from "react-typed";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MemParticles from "../components/Particles";
import TimelinePreview from "../components/TimelinePreview";

export default function Landing() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-6 lg:px-20 py-12 space-y-24">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
          <MemParticles />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <h1 className="text-4xl md:text-6xl leading-tight font-light">
              <span className="bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">
                <Typed
                  strings={[
                    "Capture Memories.",
                    "Connect Timelines.",
                    "Visualize Your Journey.",
                  ]}
                  typeSpeed={60}
                  backSpeed={40}
                  loop
                />
              </span>
            </h1>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto text-lg font-medium">
              MemNodes lets you track your past, present, and future — all in
              one timeline.
            </p>
            <div className="mt-6 space-x-4">
              <Link to="/register">
                <button className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition">
                  Get Started
                </button>
              </Link>
              <Link to="/login">
                <button className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-black transition">
                  Log In
                </button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "Create Timelines",
              desc: "Connect moments of your life with beautiful, horizontal visuals.",
            },
            {
              title: "Happiness Rating",
              desc: "Rate memories from 0 to 10 based on how you felt.",
            },
            {
              title: "Set Future Goals",
              desc: "Add future memories and dreams with dashed lines.",
            },
          ].map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="bg-white/5 p-6 rounded-xl hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
              <p className="text-gray-400">{feat.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Timeline Visual Preview */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">See It In Action</h2>
          <div className="border border-gray-700 rounded-xl p-6">
            <TimelinePreview />
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
