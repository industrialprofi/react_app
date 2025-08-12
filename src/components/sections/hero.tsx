"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Check } from "lucide-react";

export function Hero() {
  const [textareaValue, setTextareaValue] = useState("Роль социальных сетей в современном обществе");

  const suggestedTopics = [
    "Анализ темы мести в \"Гамлете\" Шекспира",
    "Влияние COVID-19 на психическое здоровье родителей", 
    "Факторы, влияющие на компенсационные стратегии и практики компаний",
    "Роль социальных сетей в современном обществе",
    "Этические соображения в создании информированного согласия для исследовательского участия"
  ];

  const handleTopicClick = (topic: string) => {
    setTextareaValue(topic);
  };
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
          Ваше эссе — написано на 90% быстрее с помощью ИИ
        </h1>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Быстрая структура</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Проверка оригинальности</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">100% бесплатные источники с PDF</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Автоматический список литературы</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Проверка грамматики и орфографии</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 max-w-2xl mx-auto mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-black text-white px-3 py-1 rounded text-sm font-medium">
              Эссе
            </div>
            <span className="text-gray-600 text-sm">Обзор литературы</span>
            <span className="text-gray-600 text-sm">Если сомневаетесь, вы можете отправить для подтверждения</span>
          </div>
          
          <textarea 
            className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none text-left text-gray-700"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            placeholder="Введите тему для эссе..."
          />
          
          <div className="mt-4 text-left">
            <p className="text-sm text-gray-600 mb-3">Предлагаемые темы:</p>
            <div className="flex flex-wrap gap-2 text-sm">
              {suggestedTopics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleTopicClick(topic)}
                  className="bg-white border border-gray-400 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-50 hover:border-gray-500 transition-all duration-200 cursor-pointer text-left"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
          
          <Button className="w-full mt-6 bg-black text-white hover:bg-gray-800 rounded-full py-3 text-base font-medium">
            ✨ Начать писать
          </Button>
        </div>

        <p className="text-gray-600 text-sm mb-4">
          Реальные академические источники от 92,000+ поставщиков
        </p>
        
        <div className="flex justify-center items-center gap-8 opacity-60">
          <img src="/api/placeholder/80/40" alt="PubMed" className="h-8" />
          <img src="/api/placeholder/80/40" alt="Springer" className="h-8" />
          <img src="/api/placeholder/80/40" alt="Cambridge" className="h-8" />
          <img src="/api/placeholder/80/40" alt="Oxford Academic" className="h-8" />
          <img src="/api/placeholder/80/40" alt="CiteSeer" className="h-8" />
          <img src="/api/placeholder/80/40" alt="IEEE" className="h-8" />
          <img src="/api/placeholder/80/40" alt="Taylor" className="h-8" />
        </div>
      </div>
    </section>
  );
}
