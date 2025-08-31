"use client";

import { Check, X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useState } from "react";
import { Slider } from "../ui/slider";

type BillingPeriod = "yearly" | "biannually" | "monthly";

type PlanType = "basic" | "standard" | "premium" | "corporate" | "enterprise" | "custom";

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
  requestCount?: string;
  description?: string;
  type?: PlanType;
}

const plans: Plan[] = [
  {
    name: "Пакет",
    type: "basic",
    requestCount: "100 запросов",
    description: "Стандарт",
    price: {
      yearly: "290 ₽",
      biannually: "290 ₽",
      monthly: "290 ₽"
    },
    period: "руб",
    features: [
      { text: "100 запросов в месяц", included: true },
      { text: "Доступ к DreamTEAM", included: true },
      { text: "Базовая поддержка", included: true },
      { text: "Экспорт результатов", included: true },
      { text: "Без рекламы", included: true }
    ],
    buttonText: "Выбрать",
    buttonVariant: "outline" as const,
    delay: 0.1,
  },
  {
    name: "Пакет",
    type: "standard",
    requestCount: "500 запросов",
    description: "DreamTEAM Plus",
    price: {
      yearly: "990 ₽",
      biannually: "990 ₽",
      monthly: "990 ₽"
    },
    period: "руб",
    features: [
      { text: "500 запросов в месяц", included: true },
      { text: "Доступ к DreamTEAM Plus", included: true },
      { text: "Приоритетная поддержка", included: true },
      { text: "Расширенная аналитика", included: true },
      { text: "Экспорт в различных форматах", included: true }
    ],
    buttonText: "Выбрать",
    buttonVariant: "outline" as const,
    delay: 0.2,
  },
  {
    name: "Пакет",
    type: "premium",
    requestCount: "3 000 запросов",
    description: "Оптимальный",
    price: {
      yearly: "2 990 ₽",
      biannually: "2 990 ₽",
      monthly: "2 990 ₽"
    },
    period: "руб",
    discount: {
      yearly: "Экономия 30%",
      biannually: "Экономия 30%",
      monthly: "Экономия 30%"
    },
    featured: true,
    features: [
      { text: "3000 запросов в месяц", included: true },
      { text: "Доступ к DreamTEAM Plus", included: true },
      { text: "VIP поддержка", included: true },
      { text: "Расширенная аналитика", included: true },
      { text: "Приоритетный доступ к новым функциям", included: true }
    ],
    buttonText: "Выбрать",
    buttonVariant: "default" as const,
    delay: 0.3,
  },
  {
    name: "Пакет",
    type: "corporate",
    requestCount: "11 000 запросов",
    description: "Для команд",
    price: {
      yearly: "5 990 ₽",
      biannually: "5 990 ₽",
      monthly: "5 990 ₽"
    },
    period: "руб",
    discount: {
      yearly: "Экономия 70%",
      biannually: "Экономия 70%",
      monthly: "Экономия 70%"
    },
    features: [
      { text: "11000 запросов в месяц", included: true },
      { text: "Доступ к DreamTEAM Plus", included: true },
      { text: "Корпоративная поддержка", included: true },
      { text: "Многопользовательский доступ", included: true },
      { text: "API доступ", included: true }
    ],
    buttonText: "Выбрать",
    buttonVariant: "outline" as const,
    delay: 0.4,
  },
  {
    name: "Корпорат",
    type: "enterprise",
    requestCount: "50 запросов в сутки",
    description: "На одного пользователя",
    price: {
      yearly: "690 ₽",
      biannually: "690 ₽",
      monthly: "690 ₽"
    },
    period: "руб",
    discount: {
      yearly: "Экономия 70%",
      biannually: "Экономия 70%",
      monthly: "Экономия 70%"
    },
    features: [
      { text: "50 запросов в сутки на пользователя", included: true },
      { text: "Доступ к DreamTEAM Plus", included: true },
      { text: "Корпоративная поддержка", included: true },
      { text: "Управление пользователями", included: true },
      { text: "Аналитика использования", included: true }
    ],
    buttonText: "Выбрать",
    buttonVariant: "outline" as const,
    delay: 0.5,
  },
  {
    name: "Промокод",
    type: "custom",
    requestCount: "100 запросов в сутки",
    description: "Для партнеров",
    price: {
      yearly: "1490 ₽",
      biannually: "1490 ₽",
      monthly: "1490 ₽"
    },
    period: "руб",
    discount: {
      yearly: "Экономия 50%",
      biannually: "Экономия 50%",
      monthly: "Экономия 50%"
    },
    features: [
      { text: "100 запросов в сутки", included: true },
      { text: "Доступ к DreamTEAM Plus", included: true },
      { text: "Приоритетная поддержка", included: true },
      { text: "Брендирование отчетов", included: true },
      { text: "API интеграция", included: true }
    ],
    buttonText: "Выбрать",
    buttonVariant: "outline" as const,
    delay: 0.6,
  }
];

interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="p-4 pt-0 text-sm text-gray-600 border-t border-gray-100">
          {answer}
        </div>
      )}
    </div>
  );
}

const faqItems = [
  {
    question: "Что такое DreamTEAM Plus?",
    answer: "DreamTEAM Plus - это расширенная версия сервиса с дополнительными функциями, улучшенной аналитикой и приоритетной поддержкой."
  },
  {
    question: "Что значит 'пакет запросов нейросети'?",
    answer: "Пакет запросов определяет количество обращений к нейросети, которые вы можете сделать в течение месяца. После исчерпания лимита вам потребуется приобрести новый пакет."
  },
  {
    question: "Что значит 'пакет 150 запросов на 24 часа'?",
    answer: "Это временный доступ к сервису на 24 часа с ограничением в 150 запросов. Идеально подходит для разовых задач или тестирования сервиса."
  },
  {
    question: "Что если я купил пакет запросов и месячный тариф сразу?",
    answer: "В этом случае запросы суммируются, и вы можете использовать их в течение срока действия подписки. Неиспользованные запросы сгорают по окончании срока."
  },
  {
    question: "Месячные тарифы автоматически продлеваются?",
    answer: "Да, месячные тарифы автоматически продлеваются при наличии средств на счете. Вы можете отключить автопродление в настройках аккаунта."
  },
  {
    question: "Как перейти на более дорогой месячный тариф?",
    answer: "Вы можете изменить тариф в любое время в личном кабинете. При переходе на более дорогой тариф разница будет рассчитана пропорционально оставшемуся времени."
  },
  {
    question: "Когда обновляется лимит запросов на сутки?",
    answer: "Лимит запросов на сутки обновляется ровно через 24 часа после активации тарифа или в полночь по московскому времени, в зависимости от выбранного тарифа."
  },
  {
    question: "Как купить тариф или пакет запросов в подарок?",
    answer: "При оформлении заказа выберите опцию 'Купить в подарок' и укажите email получателя. Получатель получит уведомление с инструкцией по активации."
  }
];

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("biannually");
  const [sliderValue, setSliderValue] = useState<number[]>([1000]);

  return (
    <section className="py-14 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Выберите идеальный тариф</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg sm:text-xl">Получите доступ к мощным инструментам нейросети для вашего бизнеса или личных задач</p>
          
          <div className="max-w-2xl mx-auto my-10">
            <div className="bg-gradient-to-r from-purple-600 via-blue-700 to-indigo-900 rounded-xl p-1 shadow-lg">
              <div className="flex flex-col items-center py-5 px-6 bg-white/10 rounded-xl">
                <p className="text-white text-center mb-4 font-medium">Настройте количество запросов: {sliderValue[0]}</p>
                <Slider
                  defaultValue={[1000]}
                  max={5000}
                  min={100}
                  step={100}
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  className="w-full max-w-md"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: plan.delay }}
              viewport={{ once: true, margin: "-50px" }}
              className={`bg-white rounded-2xl shadow-md overflow-hidden relative transform transition-all duration-300 hover:shadow-xl ${
                plan.featured ? "border-2 border-blue-500 scale-105 z-10" : "border border-gray-200"
              }`}
            >
              {plan.discount && plan.discount[billingPeriod] && (
                <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-full uppercase tracking-wide">
                  {plan.discount[billingPeriod]}
                </div>
              )}
              
              <div className="p-6">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">{plan.name}</p>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">{plan.requestCount}</h3>
                  <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                </div>
                
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-gray-900">{plan.price[billingPeriod]}</span>
                    <span className="text-gray-600 text-sm">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 text-sm">
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
                      <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}
                        >
                          {feature.text}
                        </span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full rounded-full text-sm py-2 font-medium transition-all duration-200 ${
                    plan.featured 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  size="sm"
                  onClick={() => {
                    console.log(`Выбран тариф: ${plan.name} ${plan.requestCount}`);
                    // Здесь будет интеграция с API для оформления подписки
                    // Например: handleSubscription(plan.type);
                  }}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Здесь была мной удалена кнопка 'Купить в подарок' */}
        
        <div className="max-w-3xl mx-auto mt-16 mb-8">
          <h2 className="text-2xl font-bold text-center mb-8">Частые вопросы</h2>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <FaqItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
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
