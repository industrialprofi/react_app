"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
};

interface NavigationProps {
  items: NavItem[];
  className?: string;
}

export function Navigation({ items, className }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Десктопная навигация */}
      <nav className={cn("hidden md:flex space-x-6", className)}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-gray-700 hover:text-[#2563eb] font-medium transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Мобильная навигация */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-gray-700 hover:text-[#2563eb] transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50"
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white p-4 shadow-lg border-t border-gray-100 z-50 animate-fadeIn">
            <nav className="flex flex-col space-y-4 container mx-auto px-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-[#2563eb] font-medium transition-colors text-lg py-2 border-b border-gray-50 last:border-b-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
