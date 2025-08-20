"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "Являются ли источники реальными и высококачественными?",
    answer: "Да! Мы предоставляем доступ ко всем крупнейшим академическим библиотекам, включая более 70 миллионов автоматически проверенных источников. Вы можете быть уверены в качестве наших академических источников, поскольку они прошли проверку на релевантность и достоверность.",
    isOpen: true,
  },
  {
    question: "Какие типы текстов я могу создавать с помощью сервиса?",
    answer: "Вы можете создавать эссе, исследовательские работы, обзоры литературы, кейс-стади, отчеты, презентации и многое другое. Наш ИИ адаптируется к различным академическим стилям и требованиям, помогая вам создавать качественный контент для любых целей.",
    isOpen: false,
  },
  {
    question: "Можно ли доверять предложениям и рекомендациям ИИ?",
    answer: "Наши ИИ-рекомендации основаны на проверенных академических источниках и современных исследованиях. Система постоянно обучается на качественных данных для предоставления точных и релевантных предложений, соответствующих академическим стандартам.",
    isOpen: false,
  },
  {
    question: "Будет ли мой текст оригинальным и уникальным?",
    answer: "Абсолютно! Каждый текст, созданный с помощью нашего сервиса, является уникальным и оригинальным. Мы используем передовые алгоритмы для обеспечения уникальности контента и предоставляем встроенную проверку на плагиат, чтобы гарантировать оригинальность ваших работ.",
    isOpen: false,
  },
  {
    question: "Как максимально эффективно использовать ИИ-ассистента?",
    answer: "Для максимальной эффективности рекомендуем четко формулировать запросы, использовать ключевые слова по теме, и активно взаимодействовать с предложениями ИИ для улучшения результата. Чем точнее ваш запрос, тем более релевантные результаты вы получите.",
    isOpen: false,
  },
  {
    question: "Как обеспечивается конфиденциальность моих данных?",
    answer: "Мы серьезно относимся к конфиденциальности ваших данных. Вся информация шифруется с использованием современных протоколов безопасности. Мы не передаем ваши данные третьим лицам и не используем их для обучения моделей без вашего явного согласия.",
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
    <section className="bg-gray-50 py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Часто задаваемые вопросы
        </h2>
        
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors rounded-xl"
              >
                <span className="font-medium text-gray-900 pr-4 text-lg">{item.question}</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${openItems.includes(index) ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed text-base">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">Остались вопросы? Мы всегда готовы помочь</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-8 rounded-full transition-colors">
            Связаться с поддержкой
          </button>
        </div>
      </div>
    </section>
  );
}
