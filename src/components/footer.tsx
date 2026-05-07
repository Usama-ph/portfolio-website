import Link from "next/link";
import { Mail } from "lucide-react";
import Image from "next/image";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/social-icons";

const socialLinks = [
  { href: "https://github.com/usama-ph", icon: GithubIcon, label: "GitHub" },
  { href: "https://linkedin.com/in/usama-adil-77b223239/", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "https://www.instagram.com/part_time_gamer.2001/", icon: InstagramIcon, label: "Instagram" },
  { href: "mailto:adilusama16@gmail.com", icon: Mail, label: "Email" },
];

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/">
              <Image
                src="/assets/ua-logo.png"
                alt="Usama Adil"
                width={48}
                height={48}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-zinc-500 text-sm text-center md:text-left max-w-xs">
              Full Stack Engineer building modern web & AI products.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-400 hover:text-zinc-100 text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="w-9 h-9 rounded-lg bg-zinc-800/60 hover:bg-zinc-700/60 border border-zinc-700/50 flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-all"
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} Usama Adil. All rights reserved.
          </p>
          <p className="text-zinc-600 text-sm">
            Built with{" "}
            <span className="text-zinc-400">Next.js</span> &{" "}
            <span className="text-zinc-400">TailwindCSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
