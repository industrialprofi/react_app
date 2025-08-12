"use client";

import Link from "next/link";
import { Navigation } from "../ui/navigation";
import { Button } from "../ui/button";

const navItems = [
  { label: "Возможности", href: "#возможности" },
  { label: "Цены", href: "#цены" },
  { label: "Отзывы", href: "#отзывы" },
  { label: "Контакты", href: "#контакты" },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 py-3 sm:py-4 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl sm:text-2xl text-primary hover:text-[var(--primary-hover)] transition-colors">
          TextAI
        </Link>
        
        <div className="flex items-center gap-2 sm:gap-6">
          <Navigation items={navItems} />
          <Button variant="default" size="sm" className="hidden md:inline-flex">
            Начать бесплатно
          </Button>
        </div>
      </div>
    </header>
  );
}
