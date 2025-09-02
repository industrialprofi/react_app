"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Логотип и описание */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-semibold text-gray-900">DreamTeam</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              ИИ-помощник для создания качественных академических работ за минуты
            </p>
          </div>

          {/* Функционал */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Возможности</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Мои разговоры
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Тарифы
                </Link>
              </li>
            </ul>
          </div>

          {/* Поддержка */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Поддержка</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Помощь
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Условия использования
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; 2025 DreamTeam. Все права защищены.
          </p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mt-4 md:mt-0"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-500 text-sm">Сервис работает</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
