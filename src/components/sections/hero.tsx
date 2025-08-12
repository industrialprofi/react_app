"use client";

import { Button } from "../ui/button";
import { Check } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
          Ваше эссе — написано на 90% быстрее с помощью ИИ
        </h1>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Быстрая структура</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Проверка оригинальности</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>100% бесплатные источники с PDF</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Автоматический список литературы</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Проверка грамматики и орфографии</span>
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
            className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none text-left"
            placeholder="Роль социальных сетей в современном обществе"
          />
          
          <div className="mt-4 text-left">
            <p className="text-sm text-gray-600 mb-2">Предлагаемые темы:</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-gray-100 px-2 py-1 rounded">Анализ темы мести в "Гамлете" Шекспира</span>
              <span className="bg-gray-100 px-2 py-1 rounded">Влияние COVID-19 на психическое здоровье родителей</span>
              <span className="bg-gray-100 px-2 py-1 rounded">Факторы, влияющие на компенсационные стратегии и практики компаний</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs mt-2">
              <span className="bg-gray-100 px-2 py-1 rounded">Роль социальных сетей в современном обществе</span>
              <span className="bg-gray-100 px-2 py-1 rounded">Этические соображения в создании информированного согласия для исследовательского участия</span>
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
