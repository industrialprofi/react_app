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
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Фоновый паттерн */}
      <div className="absolute inset-0 bg-dots-pattern opacity-30"></div>

      {/* Основной контент */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Помощник №1 для студентов и школьников
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-8 leading-tight">
              Ваше эссе — написано
              <br />
              <span className="text-blue-600">на 90% быстрее</span>
              <br />
              с помощью ИИ
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Создавайте качественные академические работы за минуты. Получите структурированное эссе с источниками и автоматической проверкой оригинальности.
            </p>
          </div>

          {/* Преимущества */}
          <div className="grid md:grid-cols-5 gap-6 mb-16">
            {[
              { icon: "⚡", text: "Быстрая структура" },
              { icon: "🎯", text: "Проверка оригинальности" },
              { icon: "📚", text: "Бесплатные источники" },
              { icon: "📝", text: "Автоматический список литературы" },
              { icon: "✨", text: "Проверка грамматики" }
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 text-center hover:shadow-lg hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <div className="text-sm font-medium text-gray-700">{item.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Основная форма */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 p-8 md:p-12">
              {/* Типы работ */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  { label: "Эссе", active: true },
                  { label: "Обзор литературы", active: false },
                  { label: "Кейс-стади", active: false },
                  { label: "Исследование", active: false }
                ].map((type, index) => (
                  <button
                    key={index}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      type.active
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Поле ввода */}
              <div className="mb-8">
                <textarea
                  className="w-full h-32 p-6 border-2 border-gray-200 rounded-2xl resize-none text-gray-700 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-400"
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  placeholder="Введите тему для эссе..."
                />
              </div>

              {/* Предлагаемые темы */}
              <div className="mb-8">
                <p className="text-sm text-gray-600 mb-4 font-medium">Популярные темы:</p>
                <div className="flex flex-wrap gap-3">
                  {suggestedTopics.map((topic, index) => (
                    <button
                      key={index}
                      onClick={() => handleTopicClick(topic)}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 transition-all duration-300 text-sm font-medium text-left shadow-sm hover:shadow-md"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Аутентификация или кнопка генерации */}
              {!token ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">Для генерации эссе войдите в систему:</p>
                  </div>
                  <LoginForm />
                </div>
              ) : (
                <Button
                  className="w-full py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  onClick={handleStartWriting}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      ✨ Генерирую эссе...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      ✨ Начать писать
                    </div>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Результат генерации */}
          {essayResult && (
            <div className="max-w-4xl mx-auto mt-12">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">✓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800">Эссе готово!</h3>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
                  <pre className="text-gray-700 whitespace-pre-wrap font-sans leading-relaxed text-base">
                    {essayResult}
                  </pre>
                </div>

                <p className="text-sm text-gray-600 mt-6 text-center">
                  Эссе сохранено в вашем разговоре. Продолжите работу в разделе "Мои разговоры".
                </p>
              </div>
            </div>
          )}

          {/* Ошибка */}
          {error && (
            <div className="max-w-2xl mx-auto mt-8">
              <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-xl">⚠️</span>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            </div>
          )}

          {/* Академические источники */}
          <div className="text-center mt-20">
            <p className="text-gray-600 text-lg mb-8">
              Доступ к <span className="font-semibold text-gray-900">92,000+</span> академическим источникам
            </p>

            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {[
                { name: "PubMed", logo: "🏥" },
                { name: "Springer", logo: "📖" },
                { name: "Cambridge", logo: "🎓" },
                { name: "Oxford", logo: "📚" },
                { name: "CiteSeer", logo: "🔍" },
                { name: "IEEE", logo: "⚡" },
                { name: "Taylor", logo: "📝" }
              ].map((source, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors">
                  <span className="text-2xl">{source.logo}</span>
                  <span className="text-sm font-medium">{source.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
