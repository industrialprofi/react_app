"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const plans = [
  {
    name: "Бесплатный",
    price: "0 ₽",
    description: "Для базового использования",
    features: [
      "10 запросов в день",
      "Генерация до 500 слов",
      "Базовые типы текстов",
      "Стандартное время генерации"
    ],
    buttonText: "Начать бесплатно",
    buttonVariant: "outline" as const,
    delay: 0.1,
  },
  {
    name: "Стандартный",
    price: "699 ₽",
    period: "в месяц",
    description: "Для регулярного использования",
    features: [
      "100 запросов в день",
      "Генерация до 2000 слов",
      "Все типы текстов",
      "Быстрое время генерации",
      "Приоритетная поддержка"
    ],
    buttonText: "Выбрать план",
    buttonVariant: "default" as const,
    featured: true,
    delay: 0.3,
  }
];

export function Pricing() {
  return (
    <section id="цены" className="py-14 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Простые и понятные тарифы</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-1">
            Выберите подходящий тариф и начните создавать качественные тексты прямо сейчас
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: plan.delay }}
              viewport={{ once: true, margin: "-50px" }}
              className={`bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden ${
                plan.featured ? "border-2 border-[#2563eb] relative" : "border border-gray-200"
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2563eb] text-white text-xs font-bold py-1 px-3 sm:px-4 rounded-full">
                  Популярный выбор
                </div>
              )}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-3 sm:mb-4">
                  <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="ml-1 text-sm sm:text-base text-gray-600">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{plan.description}</p>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563eb] mr-2 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.buttonVariant}
                  className="w-full"
                  size="sm"
                >
                  {plan.buttonText}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
