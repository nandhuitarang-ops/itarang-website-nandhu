"use client";

import { Dock } from "@/components/ui/dock-two";
import {
  Zap,
  Handshake,
  Users,
  Mail,
  MessageCircle,
} from "lucide-react";

const dockItems = [
  { icon: Zap, label: "How It Works", href: "/how-it-works" },
  { icon: Handshake, label: "Partners", href: "/for-partners" },
  { icon: Users, label: "About", href: "/about" },
  { icon: Mail, label: "Contact", href: "/contact" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/918920828425" },
];

export default function FloatingDock() {
  return (
    <div className="hidden md:block">
      <Dock
        items={dockItems}
        className="backdrop-blur-2xl bg-white/90 border-dark-900/5 shadow-xl shadow-dark-900/5"
      />
    </div>
  );
}
