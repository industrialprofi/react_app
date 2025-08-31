"use client";

import { useState } from "react";
import { Button } from "../ui/button";

const tabs = [
  {
    id: "essays",
    label: "Эссе",
    icon: "📝",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "reviews",
    label: "Обзоры литературы",
    icon: "📚",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "studies",
    label: "Кейс-стади",
    icon: "🔬",
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: "research",
    label: "Исследования",
    icon: "🔍",
    color: "from-orange-500 to-red-500"
  },
  {
    id: "writing",
    label: "Творческое письмо",
    icon: "✨",
    color: "from-violet-500 to-purple-500"
  },
];

const tabContent = {
  essays: {
    title: "Академические эссе",
    description: "Создайте четкую структуру, соберите ключевую информацию и разработайте убедительные аргументы с сильным заключением. ИИ поможет сохранить ваш стиль, одновременно выделяя ваши идеи.",
    features: ["Структура текста", "Логическая аргументация", "Академический стиль", "Проверка логики"],
    gradient: "from-blue-500/10 to-cyan-500/10"
  },
  reviews: {
    title: "Обзоры литературы",
    description: "Исследуйте широкий спектр источников для анализа существующих знаний в вашей области. Обобщайте ключевые идеи, оценивайте новейшие и фундаментальные работы.",
    features: ["Анализ источников", "Критическая оценка", "Синтез знаний", "Академические стандарты"],
    gradient: "from-purple-500/10 to-pink-500/10"
  },
  studies: {
    title: "Кейс-стади",
    description: "Погрузитесь в реальные примеры из бизнеса, культуры, социологии и других областей. Получите точные данные и цитаты для обоснованных выводов.",
    features: ["Реальные примеры", "Эмпирические данные", "Практический анализ", "Обоснованные выводы"],
    gradient: "from-emerald-500/10 to-teal-500/10"
  },
  research: {
    title: "Научные исследования",
    description: "Улучшите свою работу с разнообразными источниками, откройте новые идеи и проведите глубокий анализ. ИИ поможет соответствовать академическим стандартам.",
    features: ["Методология", "Анализ данных", "Научный стиль", "Валидация результатов"],
    gradient: "from-orange-500/10 to-red-500/10"
  },
  writing: {
    title: "Творческое письмо",
    description: "Раскройте свое воображение и воплотите идеи в жизнь с помощью ИИ. Создавайте увлекательные истории, совершенствуйте свой стиль.",
    features: ["Креативный стиль", "Нарративная структура", "Эмоциональная глубина", "Литературные техники"],
    gradient: "from-violet-500/10 to-purple-500/10"
  }
};

export function Features() {
  const [activeTab, setActiveTab] = useState("essays");

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Фоновый паттерн */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="text-lg">🎓</span>
            Для студентов и исследователей
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
            Мощный ИИ-помощник для
            <br />
            академической работы
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Создавайте качественные академические работы любого типа. От простых эссе до сложных исследований — ИИ поможет вам на каждом этапе.
          </p>
        </div>

        {/* Табы */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative px-6 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg shadow-blue-500/25`
                  : "bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{tab.icon}</span>
                <span className="text-sm md:text-base">{tab.label}</span>
              </div>

              {/* Активный индикатор */}
              {activeTab === tab.id && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Контент таба */}
        <div className={`bg-gradient-to-br ${tabContent[activeTab as keyof typeof tabContent].gradient} rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 backdrop-blur-sm`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Левая колонка - описание */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {tabContent[activeTab as keyof typeof tabContent].title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {tabContent[activeTab as keyof typeof tabContent].description}
                </p>
              </div>

              {/* Особенности */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 text-lg">Что вы получите:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tabContent[activeTab as keyof typeof tabContent].features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Кнопка действия */}
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                ✨ Попробовать {tabContent[activeTab as keyof typeof tabContent].title}
              </Button>
            </div>

            {/* Правая колонка - демо */}
            <div className="relative">
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-gray-200/50">
                {/* Заголовок окна */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    DreamTeamSAAS - {tabContent[activeTab as keyof typeof tabContent].title}
                  </span>
                </div>

                {/* Пример работы */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">AI</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">ИИ-помощник</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      "Отличная тема! Я помогу вам создать структурированное {tabContent[activeTab as keyof typeof tabContent].title.toLowerCase()}
                      с сильными аргументами и академическим стилем. Давайте начнем с плана работы..."
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">👤</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Вы</span>
                    </div>
                    <p className="text-gray-600 text-sm italic">
                      Введите вашу тему для генерации {tabContent[activeTab as keyof typeof tabContent].title.toLowerCase()}...
                    </p>
                  </div>

                  {/* Статус генерации */}
                  <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                    <span className="text-sm text-blue-700 font-medium">Анализирую источники...</span>
                  </div>
                </div>

                {/* Функции ИИ */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-lg mb-1">📊</div>
                    <div className="text-xs font-medium text-gray-700">Анализ</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-lg mb-1">✍️</div>
                    <div className="text-xs font-medium text-gray-700">Написание</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-lg mb-1">🔍</div>
                    <div className="text-xs font-medium text-gray-700">Исследование</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-lg mb-1">✅</div>
                    <div className="text-xs font-medium text-gray-700">Проверка</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            { number: "92,000+", label: "Академических источников", icon: "📚" },
            { number: "50+", label: "Типов документов", icon: "📄" },
            { number: "24/7", label: "Работа ИИ", icon: "🤖" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
