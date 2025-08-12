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
            className="text-muted-foreground hover:text-primary font-medium transition-all duration-200 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Мобильная навигация */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-muted-foreground hover:text-primary transition-all duration-200 rounded-xl hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-ring hover:scale-105"
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md p-4 shadow-xl border-t border-border z-50 animate-fadeIn">
            <nav className="flex flex-col space-y-4 container mx-auto px-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary font-medium transition-all duration-200 text-lg py-3 border-b border-border/30 last:border-b-0 hover:translate-x-2"
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
