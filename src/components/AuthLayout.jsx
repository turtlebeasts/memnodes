import Header from "../components/Header";
import Footer from "../components/Footer";
import MemParticles from "../components/Particles";

export default function AuthLayout({ children, title }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-black text-white overflow-hidden">
      {/* Particle Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MemParticles />
      </div>

      {/* Header (above particles) */}
      <div className="relative z-10">
        <Header />
      </div>

      {/* Main Auth Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md bg-white/5 p-8 rounded-2xl backdrop-blur-md shadow-2xl border border-white/10">
          <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
          {children}
        </div>
      </main>

      {/* Footer (above particles) */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
