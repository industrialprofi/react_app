"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { chatApi } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";
import { LoginForm } from "../auth/LoginForm";

export function Hero() {
  const [textareaValue, setTextareaValue] = useState("Роль социальных сетей в современном обществе");
  const [essayResult, setEssayResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const { user, token } = useAuth();

  const suggestedTopics = [
    "Анализ темы мести в \"Гамлете\" Шекспира",
    "Влияние COVID-19 на психическое здоровье подростков", 
    "Этические проблемы искусственного интеллекта в современном мире",
    "Роль социальных сетей в современном обществе",
    "Изменение климата: причины, последствия и пути решения"
  ];

  const handleTopicClick = (topic: string) => {
    setTextareaValue(topic);
  };

  // Функция генерации эссе
  const handleStartWriting = async () => {
    if (!textareaValue.trim()) return;

    setError("");
    setEssayResult("");
    setIsGenerating(true);

    try {
      const response = await chatApi.sendMessage({
        message: `Напиши эссе на тему: ${textareaValue}`,
        // conversation_id не указываем, AI создаст новый разговор
      });

      setEssayResult(response.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка генерации эссе");
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Ваше эссе — написано на 90% быстрее с помощью ИИ
        </h1>
        
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
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
            <span className="text-gray-700">Бесплатные источники с PDF</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Автоматический список литературы</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Проверка грамматики</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 max-w-2xl mx-auto mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Эссе
            </div>
            <span className="text-gray-600 text-sm hover:text-blue-600 cursor-pointer">Обзор литературы</span>
            <span className="text-gray-600 text-sm hover:text-blue-600 cursor-pointer">Кейс-стади</span>
            <span className="text-gray-600 text-sm hover:text-blue-600 cursor-pointer">Исследование</span>
          </div>
          
          <textarea 
            className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none text-left text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="bg-gray-50 border border-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 cursor-pointer text-left"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
          
          {/* Показываем LoginForm если пользователь не авторизован */}
          {!token ? (
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-4">Для генерации эссе необходимо войти в систему:</p>
              <LoginForm />
            </div>
          ) : (
            <Button 
              className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700 rounded-full py-3 text-base font-medium"
              onClick={handleStartWriting}
              disabled={isGenerating}
            >
              {isGenerating ? "✨ Генерирую эссе..." : "✨ Начать писать"}
            </Button>
          )}
        </div>

        {/* Отображение ошибки */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {/* Отображение результата генерации */}
        {essayResult && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-4xl mx-auto mb-10">
            <h3 className="text-lg font-medium mb-4 text-green-800">Сгенерированное эссе:</h3>
            <div className="text-left text-gray-700 whitespace-pre-wrap bg-white p-4 rounded border">
              {essayResult}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Эссе сохранено в вашем разговоре. Вы можете продолжить работу в разделе "Мои разговоры".
            </p>
          </div>
        )}

        <p className="text-gray-600 text-sm mb-6">
          Доступ к реальным академическим источникам от 92,000+ поставщиков
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 opacity-70">
          <img src="/file.svg" alt="PubMed" className="h-6" />
          <img src="/file.svg" alt="Springer" className="h-6" />
          <img src="/file.svg" alt="Cambridge" className="h-6" />
          <img src="/file.svg" alt="Oxford Academic" className="h-6" />
          <img src="/file.svg" alt="CiteSeer" className="h-6" />
          <img src="/file.svg" alt="IEEE" className="h-6" />
          <img src="/file.svg" alt="Taylor" className="h-6" />
        </div>
      </div>
    </section>
  );
}
