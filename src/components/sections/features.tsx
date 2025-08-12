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

export function Features() {
  const [activeTab, setActiveTab] = useState("essays");

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-12">
          Aithor может помочь вам с
        </h2>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "essays" && (
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-left">
              <h3 className="text-2xl font-bold text-black mb-4">Эссе</h3>
              <p className="text-gray-600 mb-6">
                Создайте новую структуру, получите ключевую информацию и разработайте убедительные 
                аргументы с помощью убедительного заключения. ИИ поможет поддержать ваше время, 
                гарантируя при этом, что ваши идеи выделяются.
              </p>
              <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6">
                ✨ Начать бесплатно
              </Button>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="/api/placeholder/400/300" 
                  alt="Пример эссе" 
                  className="rounded-lg shadow-lg w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
