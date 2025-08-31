"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

interface Plan {
  name: string;
  price: string;
  requests: string;
  features: string[];
  featured?: boolean;
}

const plans: Plan[] = [
  {
    name: "Базовый",
    price: "290 ₽",
    requests: "100 запросов/месяц",
    features: [
      "AI помощник для учебы",
      "Генерация текстов",
      "Базовая поддержка"
    ]
  },
  {
    name: "Популярный",
    price: "990 ₽", 
    requests: "500 запросов/месяц",
    features: [
      "Все из базового",
      "Приоритетная поддержка",
      "Расширенные возможности",
      "Экспорт в разных форматах"
    ],
    featured: true
  },
  {
    name: "Профессиональный",
    price: "2 990 ₽",
    requests: "3000 запросов/месяц", 
    features: [
      "Все из популярного",
      "VIP поддержка",
      "Приоритетный доступ к новинкам",
      "Расширенная аналитика"
    ]
  }
];

export function Pricing() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6">
              Простые тарифы
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Выберите подходящий план для работы с AI помощником
            </p>
          </motion.div>

          {/* Тарифы */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-3xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl flex flex-col ${
                  plan.featured ? "border-blue-500 scale-105" : "border-gray-200"
                }`}
              >
                {plan.featured && (
                  <div className="bg-blue-600 text-white text-sm font-semibold py-1 px-4 rounded-full text-center mb-4">
                    Рекомендуем
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{plan.price}</div>
                  <div className="text-gray-600 text-sm">{plan.requests}</div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={`w-full py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    plan.featured 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Выбрать план
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Простая информация */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center bg-white rounded-3xl p-8 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Что входит во все планы</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <div className="text-2xl mb-2">🤖</div>
                <div>AI помощник для любых задач</div>
              </div>
              <div>
                <div className="text-2xl mb-2">💬</div>
                <div>История всех разговоров</div>
              </div>
              <div>
                <div className="text-2xl mb-2">📱</div>
                <div>Работа на всех устройствах</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
