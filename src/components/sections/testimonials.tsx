"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    content: "TextAI существенно сократил время на подготовку рефератов. Теперь я могу больше времени уделять проработке материала, а не его написанию.",
    author: "Алексей С.",
    role: "Студент, Москва"
  },
  {
    content: "Пользуюсь сервисом для создания контента для соцсетей. Качество текстов на высоте, практически никогда не требуется доработка.",
    author: "Марина В.",
    role: "Контент-менеджер, Санкт-Петербург"
  },
  {
    content: "Как копирайтеру, TextAI помогает мне генерировать идеи и преодолевать творческие блоки. Это отличный инструмент для мозгового штурма.",
    author: "Дмитрий К.",
    role: "Копирайтер, Екатеринбург"
  },
  {
    content: "Учителя были удивлены качеством моего последнего сочинения. TextAI помог структурировать мысли и избежать типичных ошибок.",
    author: "Анна П.",
    role: "Школьница, Казань"
  }
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  return (
    <section id="отзывы" className="py-14 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Что говорят пользователи</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Тысячи людей уже экономят свое время с помощью TextAI
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
            onTouchStart={() => setAutoplay(false)}
            onTouchEnd={() => setAutoplay(true)}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <div className="bg-white p-5 sm:p-8 rounded-lg sm:rounded-xl shadow-md">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#2563eb]/30 mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10,8H6a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2h4v6H6a6,6,0,0,1-6-6V10A6,6,0,0,1,6,4h4Zm16-4H22a6,6,0,0,0-6,6v6a6,6,0,0,0,6,6h4V16H22a2,2,0,0,1-2-2V10a2,2,0,0,1,2-2h4Z" />
                    </svg>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">{testimonial.content}</p>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">{testimonial.author}</p>
                      <p className="text-gray-500 text-xs sm:text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={prevSlide} 
            className="absolute top-1/2 -left-2 sm:-left-4 -translate-y-1/2 bg-white rounded-full p-1 sm:p-2 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50"
            aria-label="Предыдущий отзыв"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" />
          </button>
          
          <button 
            onClick={nextSlide} 
            className="absolute top-1/2 -right-2 sm:-right-4 -translate-y-1/2 bg-white rounded-full p-1 sm:p-2 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50"
            aria-label="Следующий отзыв"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" />
          </button>

          <div className="flex justify-center space-x-1 sm:space-x-2 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                  activeIndex === index ? "bg-[#2563eb]" : "bg-gray-300"
                }`}
                aria-label={`Перейти к отзыву ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
