"use client";

import { motion } from "framer-motion";
import { AIChat } from "../chat/AIChat";
import Link from "next/link";
import { Button } from "flowbite-react";

export function Hero() {
  const features = [
    { icon: "🤖", title: "AI Помощник", desc: "Умный чат-бот для любых задач" },
    { icon: "📝", title: "Генерация текстов", desc: "Эссе, рефераты, исследования" },
    { icon: "💬", title: "История чатов", desc: "Все разговоры сохраняются" }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              ИИ-помощник для студентов
            </div>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6 leading-tight">
              Общайтесь с AI
              <br />
              <span className="text-blue-600">прямо сейчас</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Задавайте вопросы, создавайте тексты, получайте помощь с учебой — все в одном месте
            </p>
          </motion.div>

          {/* Возможности */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 text-center hover:bg-white/80 transition-all duration-300"
              >
                <div className="text-2xl mb-2">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* AI Чат */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <AIChat />
          </motion.div>

          {/* CTA секция */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Нужно больше возможностей?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Получите доступ к расширенным функциям: неограниченные запросы, 
                приоритетная поддержка, экспорт в различные форматы
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/subscriptions">
                  <Button color="light" className="px-8 py-3 rounded-xl font-semibold">
                    Посмотреть тарифы
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button color="light" outline className="px-8 py-3 rounded-xl font-semibold">
                    Мои разговоры
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Статистика */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-16 text-center"
          >
            {[
              { number: "1K+", label: "Студентов" },
              { number: "5K+", label: "Текстов создано" },
              { number: "98%", label: "Точность AI" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
