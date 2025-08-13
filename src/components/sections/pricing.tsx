"use client";

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const plans = [
  {
    name: "Бесплатно",
    price: "0 ₽",
    period: "в месяц",
    features: [
      { text: "Ограниченная генерация контента", included: true },
      { text: "Ограниченное редактирование", included: true },
      { text: "Публичный/контентный креатор", included: true },
      { text: "Тысячи шаблонов эссе", included: true },
      { text: "Генерация изображений", included: true },
      { text: "Магия в тексте", included: true },
      { text: "Нет плагиата", included: false },
      { text: "Нет рекламы", included: false },
      { text: "Безопасный доступ к новым функциям", included: false }
    ],
    buttonText: "Начать сейчас",
    buttonVariant: "outline" as const,
    delay: 0.1,
  },
  {
    name: "Дважды в год",
    price: "1049 ₽",
    period: "в месяц",
    originalPrice: "1399 ₽",
    discount: "25% скидка",
    features: [
      { text: "Неограниченная генерация контента", included: true },
      { text: "Неограниченное редактирование", included: true },
      { text: "Тысячи шаблонов эссе и статей", included: true },
      { text: "Генерация изображений", included: true },
      { text: "Генерация текста", included: true },
      { text: "Генерация изображений", included: true },
      { text: "Все плагиаты", included: true },
      { text: "Безопасный доступ к новым функциям", included: true },
      { text: "Нет рекламы", included: true }
    ],
    buttonText: "Получить скидку",
    buttonVariant: "default" as const,
    featured: true,
    delay: 0.3,
  }
];

export function Pricing() {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-black">Цены</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            <span className="text-blue-600 font-semibold">1981</span> человек подписались сегодня. Не ждите!
          </p>
          
          <div className="flex justify-center items-center gap-4 mt-6">
            <span className="text-sm text-gray-600">Дважды в год</span>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                СКИДКА 25%
              </button>
              <span className="text-sm text-gray-600">Ежемесячно</span>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">
                СКИДКА 30%
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: plan.delay }}
              viewport={{ once: true, margin: "-50px" }}
              className={`bg-white rounded-lg shadow-lg overflow-hidden relative ${
                plan.featured ? "border-2 border-purple-500" : "border border-gray-200"
              }`}
            >
              {plan.featured && plan.discount && (
                <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold py-1 px-3 rounded-full">
                  {plan.discount}
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-sm text-gray-500 line-through mt-1">
                      {plan.originalPrice}
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full ${
                    plan.featured 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-600">
            Вы можете отменить подписку в любое время в соответствии с{" "}
            <a href="#" className="text-blue-600 underline">Условиями обслуживания</a> или{" "}
            <a href="#" className="text-blue-600 underline">Политикой возврата</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
