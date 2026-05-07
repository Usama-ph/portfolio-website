"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/social-icons";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/923234465860"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-black/30 hover:shadow-[#25D366]/40 hover:shadow-xl transition-shadow"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <WhatsAppIcon className="relative w-7 h-7 text-white" />
    </motion.a>
  );
}
