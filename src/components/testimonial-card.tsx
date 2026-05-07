"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

type TestimonialCardProps = {
  name: string;
  role: string;
  company: string;
  content: string;
  index?: number;
};

export default function TestimonialCard({
  name,
  role,
  company,
  content,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 hover:border-zinc-700/60 transition-all duration-300 flex flex-col gap-4"
    >
      <Quote className="w-8 h-8 text-blue-500/40" />
      <p className="text-zinc-300 leading-relaxed italic flex-1">"{content}"</p>
      <div className="flex items-center gap-3 pt-2 border-t border-zinc-800/50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-semibold text-sm">
          {name.charAt(0)}
        </div>
        <div>
          <div className="text-zinc-100 font-semibold text-sm">{name}</div>
          <div className="text-zinc-500 text-xs">
            {role} · {company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
