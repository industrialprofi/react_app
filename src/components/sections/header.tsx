"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "flowbite-react";
import { useAuth } from "../../lib/auth-context";
import { motion } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100"
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Минималистичный логотип */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">AI</span>
            </motion.div>
            <span className="font-semibold text-gray-900">DreamTeam</span>
          </Link>

          {/* Центральная навигация */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/subscriptions" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Тарифы
            </Link>
          </nav>

          {/* Правая часть */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button color="light" size="sm" className="text-gray-600">
                    Кабинет
                  </Button>
                </Link>
                <Button color="light" size="sm" onClick={logout} className="text-gray-600">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button color="light" size="sm" className="text-gray-600">
                    Войти
                  </Button>
                </Link>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="sm" color="blue">
                    Начать
                  </Button>
                </motion.div>
              </>
            )}

            {/* Мобильное меню */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
                <span className={`block w-4 h-0.5 bg-current transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block w-4 h-0.5 bg-current transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-4 h-0.5 bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
            <div className="flex flex-col gap-3">
              <Link href="/subscriptions" className="text-gray-600 py-2" onClick={() => setIsMenuOpen(false)}>
                Тарифы
              </Link>
              {!isAuthenticated && (
                <Link href="/auth/login" className="text-gray-600 py-2" onClick={() => setIsMenuOpen(false)}>
                  Войти
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
