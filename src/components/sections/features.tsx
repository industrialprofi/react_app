"use client";

import { useState } from "react";
import { Button } from "../ui/button";

const tabs = [
  { id: "essays", label: "Эссе", active: true },
  { id: "reviews", label: "Обзоры литературы", active: false },
  { id: "studies", label: "Кейс-стади", active: false },
  { id: "research", label: "Исследования", active: false },
  { id: "writing", label: "Творческое письмо", active: false },
];

const tabContent = {
  essays: {
    title: "Эссе",
    description: "Создайте четкую структуру, соберите ключевую информацию и разработайте убедительные аргументы с сильным заключением. ИИ поможет сохранить ваш стиль, одновременно выделяя ваши идеи.",
    image: "/file.svg"
  },
  reviews: {
    title: "Обзоры литературы",
    description: "Исследуйте широкий спектр источников для анализа существующих знаний в вашей области. Обобщайте ключевые идеи, оценивайте новейшие и фундаментальные работы, сохраняя объективный подход.",
    image: "/file.svg"
  },
  studies: {
    title: "Кейс-стади",
    description: "Погрузитесь в реальные примеры из бизнеса, культуры, социологии и других областей. Получите точные данные и цитаты, помогающие представить четкие выводы с цифрами и хорошо обоснованными заключениями.",
    image: "/file.svg"
  },
  research: {
    title: "Исследования",
    description: "Улучшите свою работу с разнообразными источниками, откройте новые идеи и проведите глубокий анализ. ИИ поможет соответствовать академическим стандартам, одновременно совершенствуя ваш текст.",
    image: "/file.svg"
  },
  writing: {
    title: "Творческое письмо",
    description: "Раскройте свое воображение и воплотите идеи в жизнь с помощью ИИ. Создавайте увлекательные истории, совершенствуйте свой стиль и делайте тексты отточенными, сохраняя при этом свой уникальный голос.",
    image: "/file.svg"
  }
};

export function Features() {
  const [activeTab, setActiveTab] = useState("essays");

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="container mx-auto text-center max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
          DreamTeamSAAS поможет вам с
        </h2>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{tabContent[activeTab as keyof typeof tabContent].title}</h3>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              {tabContent[activeTab as keyof typeof tabContent].description}
            </p>
            <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-8 py-2.5 text-base">
              ✨ Начать бесплатно
            </Button>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Пример {tabContent[activeTab as keyof typeof tabContent].title}</h4>
                    <p className="text-gray-600 text-sm">
                      Здесь будет отображаться пример работы с {tabContent[activeTab as keyof typeof tabContent].title.toLowerCase()}. 
                      ИИ поможет вам создать структурированный и качественный текст.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Структура</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Аргументация</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Источники</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
