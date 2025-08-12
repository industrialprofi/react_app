"use client";

import Link from "next/link";
import { Navigation } from "../ui/navigation";
import { Button } from "../ui/button";

const navItems = [
  { label: "ИИ Детектор", href: "#detector" },
  { label: "Блог", href: "#blog" },
  { label: "Цены", href: "#pricing" },
  { label: "Поддержка", href: "#support" },
];

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl text-black">
          Aithor
        </Link>
        
        <div className="flex items-center gap-6">
          <Navigation items={navItems} />
          <div className="flex items-center gap-3">
            <select className="text-sm border-none bg-transparent">
              <option>🇷🇺 Ru</option>
            </select>
            <Button variant="ghost" size="sm" className="text-black">
              Войти
            </Button>
            <Button variant="default" size="sm" className="bg-black text-white hover:bg-gray-800 rounded-full px-6">
              Начать писать
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
