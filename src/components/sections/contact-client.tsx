"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, Clock, Phone, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/social-icons";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const projectTypes = [
  "Full Stack Web App",
  "API Development",
  "AI Integration",
  "CMS / Dashboard",
  "SaaS Product",
  "Other",
];

const budgetRanges = [
  "< $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Let's discuss",
];

const socialLinks = [
  { href: "https://github.com/usama-ph", icon: GithubIcon, label: "GitHub", handle: "usama-ph" },
  { href: "https://linkedin.com/in/usama-adil-77b223239/", icon: LinkedinIcon, label: "LinkedIn", handle: "Usama Adil" },
  { href: "https://www.instagram.com/part_time_gamer.2001/", icon: InstagramIcon, label: "Instagram", handle: "@part_time_gamer.2001" },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700/50 transition-all"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please reach out directly via email or phone below.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available for new projects
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">
            Let&apos;s Work{" "}
            <span className="gradient-text">Together</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Have a project in mind? Fill out the form or reach out directly — I&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20 px-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-400 mb-6" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-zinc-100 mb-3">Message Sent!</h2>
                  <p className="text-zinc-400 text-lg">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 p-6 sm:p-8 rounded-2xl border border-zinc-800/50 bg-zinc-900/30"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Your Name</label>
                      <input
                        {...register("name")}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Project Type</label>
                      <select
                        {...register("projectType")}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm appearance-none"
                      >
                        <option value="" className="bg-zinc-900">Select type...</option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t} className="bg-zinc-900">{t}</option>
                        ))}
                      </select>
                      {errors.projectType && <p className="mt-1 text-xs text-red-400">{errors.projectType.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Budget Range</label>
                      <select
                        {...register("budget")}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm appearance-none"
                      >
                        <option value="" className="bg-zinc-900">Select budget...</option>
                        {budgetRanges.map((b) => (
                          <option key={b} value={b} className="bg-zinc-900">{b}</option>
                        ))}
                      </select>
                      {errors.budget && <p className="mt-1 text-xs text-red-400">{errors.budget.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Message</label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Tell me about your project, goals, timeline, and anything else relevant..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm resize-none"
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
                  </div>

                  {error && (
                    <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <div className="p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-zinc-300">Currently Available</span>
              </div>
              <p className="text-zinc-500 text-sm">
                Open to freelance projects, consulting, and part-time collaborations.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 space-y-4">
              <h3 className="text-sm font-semibold text-zinc-300">Direct Contact</h3>

              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/40 group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-zinc-500 mb-0.5">Email</div>
                    <a
                      href="mailto:adilusama16@gmail.com"
                      className="text-sm text-zinc-200 hover:text-white transition-colors truncate block"
                    >
                      adilusama16@gmail.com
                    </a>
                  </div>
                </div>
                <CopyButton value="adilusama16@gmail.com" />
              </div>

              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/40 group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-zinc-500 mb-0.5">Phone / WhatsApp</div>
                    <a
                      href="tel:+923234465860"
                      className="text-sm text-zinc-200 hover:text-white transition-colors block"
                    >
                      +92 323 446 5860
                    </a>
                  </div>
                </div>
                <CopyButton value="+923234465860" />
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/30">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-300">Response Time</span>
              </div>
              <p className="text-zinc-500 text-sm">
                I typically respond within <span className="text-zinc-300">24 hours</span> on
                weekdays. For urgent projects, call or WhatsApp directly.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/30">
              <h3 className="text-sm font-semibold text-zinc-300 mb-4">Find Me Online</h3>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-600 transition-all">
                      <link.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500">{link.label}</div>
                      <div className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                        {link.handle}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
