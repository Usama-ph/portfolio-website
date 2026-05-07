"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl animate-glow-pulse"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 -left-40 w-80 h-80 rounded-full opacity-15 blur-3xl animate-float"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute -bottom-20 right-1/3 w-72 h-72 rounded-full opacity-10 blur-3xl animate-glow-pulse"
        style={{
          background: "radial-gradient(circle, rgba(244,114,182,0.5) 0%, transparent 70%)",
          animationDelay: "1s",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
