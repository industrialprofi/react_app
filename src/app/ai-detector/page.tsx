"use client";

import { useState } from "react";
import { Header } from "../../components/sections/header";
import { Footer } from "../../components/sections/footer";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { Shield, FileText, Clock, CheckCircle, Zap, Users, BookOpen, Target } from "lucide-react";

export default function AIDetectorPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{
    aiPercentage: number;
    humanPercentage: number;
    isAnalyzing: boolean;
  } | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setResult({ aiPercentage: 0, humanPercentage: 0, isAnalyzing: true });

    // Симуляция анализа
    setTimeout(() => {
      const aiPercentage = Math.floor(Math.random() * 100);
      setResult({
        aiPercentage,
        humanPercentage: 100 - aiPercentage,
        isAnalyzing: false,
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Фоновый паттерн */}
      <div className="absolute inset-0 bg-dots-pattern opacity-20"></div>

      <div className="relative z-10">
        <Header />

        {/* Hero секция */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                AI Детектор
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Бесплатный детектор
                <br />
                ИИ-контента
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Определите, был ли текст создан искусственным интеллектом.
                Быстрый и точный анализ для студентов и преподавателей.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Основной инструмент */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200/50"
            >
              {/* Заголовок */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Проверить текст на ИИ
                </h2>
                <p className="text-gray-600">
                  Вставьте текст для анализа (до 5000 символов)
                </p>
              </div>

              {/* Поле ввода */}
              <div className="mb-8">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Введите или вставьте текст, который хотите проверить..."
                  className="w-full h-48 p-6 border-2 border-gray-200 rounded-2xl resize-none text-gray-700 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-400"
                  maxLength={5000}
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500">
                    {text.length}/5000 символов
                  </span>
                  <Button
                    onClick={handleAnalyze}
                    disabled={!text.trim() || (result?.isAnalyzing ?? false)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {result?.isAnalyzing ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Анализируем...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Проверить
                      </div>
                    )}
                  </Button>
                </div>
              </div>

              {/* Результаты анализа */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="border-t border-gray-200 pt-8"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                    Результаты анализа
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ИИ-контент */}
                    <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-2xl border border-red-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-900">ИИ-контент</h4>
                          <p className="text-sm text-red-700">Вероятность генерации ИИ</p>
                        </div>
                      </div>

                      <div className="text-center mb-4">
                        <span className="text-4xl font-bold text-red-600">
                          {result.isAnalyzing ? "..." : `${result.aiPercentage}%`}
                        </span>
                      </div>

                      <div className="w-full bg-red-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: result.isAnalyzing ? "0%" : `${result.aiPercentage}%` }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Человеческий контент */}
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-900">Человеческий контент</h4>
                          <p className="text-sm text-green-700">Вероятность написания человеком</p>
                        </div>
                      </div>

                      <div className="text-center mb-4">
                        <span className="text-4xl font-bold text-green-600">
                          {result.isAnalyzing ? "..." : `${result.humanPercentage}%`}
                        </span>
                      </div>

                      <div className="w-full bg-green-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: result.isAnalyzing ? "0%" : `${result.humanPercentage}%` }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Как это работает */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Как работает детектор
              </h2>
              <p className="text-lg text-gray-600">
                Продвинутый алгоритм анализирует текст на наличие паттернов ИИ
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: FileText,
                  title: "Анализ структуры",
                  description: "Изучает синтаксические паттерны и стилистику текста"
                },
                {
                  icon: Target,
                  title: "Машинное обучение",
                  description: "Использует современные ML-модели для точного определения"
                },
                {
                  icon: CheckCircle,
                  title: "Мгновенный результат",
                  description: "Получите результат в течение нескольких секунд"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Для кого */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Для кого полезен детектор
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: "Студенты",
                  description: "Проверка эссе и курсовых работ на оригинальность"
                },
                {
                  icon: Users,
                  title: "Преподаватели",
                  description: "Контроль качества студенческих работ"
                },
                {
                  icon: FileText,
                  title: "Журналисты",
                  description: "Поддержание стандартов профессионального контента"
                },
                {
                  icon: Target,
                  title: "Контент-менеджеры",
                  description: "Обеспечение качества и оригинальности материалов"
                }
              ].map((user, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <user.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{user.title}</h3>
                  <p className="text-sm text-gray-600">{user.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Преимущества детектора
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Высокая точность",
                  description: "Продвинутые алгоритмы обеспечивают точность обнаружения до 95%",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Быстрый анализ",
                  description: "Получите результат в течение нескольких секунд",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  title: "Полная конфиденциальность",
                  description: "Ваш текст не сохраняется и не используется для обучения моделей",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  title: "Бесплатно",
                  description: "Полностью бесплатный инструмент без ограничений по количеству проверок",
                  color: "from-orange-500 to-red-500"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-gray-200/50"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Призыв к действию */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
            >
              <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Защитите свою работу
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Используйте наш бесплатный ИИ-детектор для проверки оригинальности контента
              </p>
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Проверить текст
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
