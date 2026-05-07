"use client";

import { motion } from "framer-motion";

type StatCardProps = {
  value: string;
  label: string;
  description: string;
  index?: number;
};

export default function StatCard({ value, label, description, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 hover:border-zinc-700/60 hover:bg-zinc-900/50 transition-all duration-300 text-center"
    >
      <div className="text-4xl font-bold gradient-text mb-2">{value}</div>
      <div className="text-zinc-100 font-semibold mb-1">{label}</div>
      <div className="text-zinc-500 text-sm">{description}</div>
    </motion.div>
  );
}
