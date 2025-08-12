"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "Являются ли эти источники реальными и высококачественными?",
    answer: "Да! Aithor предоставляет доступ ко всем крупнейшим академическим библиотекам, включая более 70 миллионов автоматически проверенных источников. Мы можете быть уверены в качестве наших академических источников, поскольку они прошли проверку на релевантность и качество.",
    isOpen: true,
  },
  {
    question: "Какой тип текстов я могу писать с Aithor?",
    answer: "С Aithor вы можете создавать эссе, исследовательские работы, обзоры литературы, кейс-стади, отчеты и многое другое. Наш ИИ адаптируется к различным академическим стилям и требованиям.",
    isOpen: false,
  },
  {
    question: "Являются ли ИИ инсайты и предложения заслуживающими доверия?",
    answer: "Наши ИИ инсайты основаны на проверенных академических источниках и современных исследованиях. Система постоянно обучается на качественных данных для предоставления точных и релевантных предложений.",
    isOpen: false,
  },
  {
    question: "Будет ли мой текст оставаться оригинальным?",
    answer: "Абсолютно! Каждый текст, созданный с помощью Aithor, является уникальным и оригинальным. Мы используем передовые алгоритмы для обеспечения уникальности контента и предоставляем встроенную проверку на плагиат.",
    isOpen: false,
  },
  {
    question: "Как максимально использовать ИИ индекс?",
    answer: "Для максимальной эффективности рекомендуем четко формулировать запросы, использовать ключевые слова по теме, и активно взаимодействовать с предложениями ИИ для улучшения результата.",
    isOpen: false,
  },
];

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
          Часто задаваемые вопросы
        </h2>
        
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-black pr-4">{item.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
