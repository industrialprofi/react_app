"use client";

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useState } from "react";

type BillingPeriod = "yearly" | "biannually" | "monthly";

type PriceInfo = {
  [key in BillingPeriod]: string;
};

type DiscountInfo = {
  [key in BillingPeriod]: string;
};

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: PriceInfo;
  period: string;
  originalPrice?: PriceInfo;
  discount?: DiscountInfo;
  features: PlanFeature[];
  buttonText: string;
  buttonVariant: "outline" | "default";
  featured?: boolean;
  delay: number;
}

const plans: Plan[] = [
  {
    name: "Бесплатно",
    price: {
      yearly: "0 ₽",
      biannually: "0 ₽",
      monthly: "0 ₽"
    },
    period: "в месяц",
    features: [
      { text: "Ограниченная генерация контента", included: true },
      { text: "Ограниченное редактирование", included: true },
      { text: "Типы контента: создание и редактирование", included: true },
      { text: "Проверка на плагиат", included: false },
      { text: "Без рекламы", included: false },
      { text: "Безопасный доступ к новым функциям", included: false }
    ],
    buttonText: "Начать сейчас",
    buttonVariant: "outline" as const,
    delay: 0.1,
  },
  {
    name: "Премиум",
    price: {
      yearly: "649 ₽",
      biannually: "849 ₽",
      monthly: "1049 ₽"
    },
    discount: {
      yearly: "40% скидка",
      biannually: "25% скидка",
      monthly: ""
    },
    originalPrice: {
      yearly: "1049 ₽",
      biannually: "1049 ₽",
      monthly: ""
    },
    period: "в месяц",
    features: [
      { text: "Неограниченная генерация контента", included: true },
      { text: "Неограниченное редактирование", included: true },
      { text: "Типы контента: создание и редактирование", included: true },
      { text: "Проверка на плагиат", included: true },
      { text: "Без рекламы", included: true },
      { text: "Безопасный доступ к новым функциям", included: true }
    ],
    buttonText: "Получить сейчас",
    buttonVariant: "default" as const,
    featured: true,
    delay: 0.3,
  }
];

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("biannually");

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">Цены</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            <span className="text-blue-600 font-semibold">1981</span> человек подписались сегодня. Не ждите!
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
            <div className="bg-white rounded-full shadow-sm border border-gray-200 p-1 flex">
              <button 
                onClick={() => setBillingPeriod("yearly")} 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${billingPeriod === "yearly" ? "bg-blue-600 text-white" : "text-gray-600"}`}
              >
                Ежегодно
                {billingPeriod === "yearly" && (
                  <span className="ml-2 bg-blue-700 text-white text-xs px-2 py-0.5 rounded-full">Скидка 40%</span>
                )}
              </button>
              <button 
                onClick={() => setBillingPeriod("biannually")} 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${billingPeriod === "biannually" ? "bg-blue-600 text-white" : "text-gray-600"}`}
              >
                Дважды в год
                {billingPeriod === "biannually" && (
                  <span className="ml-2 bg-blue-700 text-white text-xs px-2 py-0.5 rounded-full">Скидка 25%</span>
                )}
              </button>
              <button 
                onClick={() => setBillingPeriod("monthly")} 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${billingPeriod === "monthly" ? "bg-blue-600 text-white" : "text-gray-600"}`}
              >
                Ежемесячно
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
              className={`bg-white rounded-xl shadow-sm overflow-hidden relative ${
                plan.featured ? "border-2 border-blue-500" : "border border-gray-200"
              }`}
            >
              {plan.featured && plan.discount && plan.discount[billingPeriod] && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-full">
                  {plan.discount[billingPeriod]}
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{plan.name}</h3>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price[billingPeriod]}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  {plan.originalPrice && plan.originalPrice[billingPeriod] && (
                    <div className="text-sm text-gray-500 line-through mt-1">
                      {plan.originalPrice[billingPeriod]}
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-blue-600" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full rounded-full ${
                    plan.featured 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
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
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Вы можете отменить подписку в любое время. При отмене подписки вы сможете пользоваться сервисом до конца оплаченного периода в соответствии с{" "}
            <a href="#" className="text-blue-600 hover:underline">Условиями обслуживания</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
