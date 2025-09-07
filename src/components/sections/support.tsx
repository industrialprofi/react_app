"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, MessageCircle, ArrowRight, Plus } from "lucide-react";
import { Button, TextInput, Textarea, Alert } from "flowbite-react";
import Head from "next/head";

const faqData = [
  {
    question: "Как отменить подписку?",
    answer: "Для отмены подписки выполните следующие шаги:\n1. Нажмите на иконку круга в правом верхнем углу.\n2. Нажмите на статус Pro.\n3. Затем нажмите кнопку Отменить, чтобы прекратить подписку."
  },
  {
    question: "Нет цитат/ссылок, как их получить?",
    answer: "Чтобы добавить цитату, выполните следующие шаги:\n1. Нажмите кнопку 'Действия ИИ' рядом с нужным абзацем или выделите конкретное предложение и нажмите ту же кнопку.\n2. Выберите 'Найти ссылки' из вариантов.\n3. Выберите предпочтительную ссылку из предоставленного списка.\n4. Выберите стиль цитирования.\n5. Нажмите 'Подтвердить', чтобы включить цитату в абзац."
  },
  {
    question: "Как писать с помощником ИИ?",
    answer: "Наш ИИ-помощник поможет вам создавать качественные тексты:\n1. Выберите тип документа (эссе, статья, отчет).\n2. Укажите тему и основные требования.\n3. ИИ создаст структуру и начальный текст.\n4. Редактируйте и дополняйте содержание по необходимости.\n5. Используйте функции проверки на плагиат и грамматику."
  },
  {
    question: "Я не получил email для сброса пароля",
    answer: "Для повторной отправки пароля выполните следующие шаги:\n1. Проверьте папку Спам.\n2. Если вы не можете найти ссылку для сброса пароля в папке спам, это означает, что ваш аккаунт, скорее всего, был зарегистрирован через Google или Facebook. Попробуйте войти через эти сервисы."
  },
  {
    question: "Я оплатил подписку, но мой аккаунт показывает 'базовый'",
    answer: "Скорее всего, вы вошли в неправильный аккаунт. Попробуйте другие возможные логины.\n\nТакже обратите внимание, что вход через Google или Facebook и вход путем ввода логина/пароля вручную - это не одно и то же. Попробуйте войти разными способами авторизации.\n\nЕсли вы не можете найти способ войти в правильный аккаунт, отправьте нам чек об оплате и последние 4 цифры использованной карты. Мы найдем его для вас."
  },
  {
    question: "Как работает возврат средств за подписку?",
    answer: "Вы можете запросить возврат первоначального платежа за подписку в течение семи (7) календарных дней с момента транзакции и возврат повторяющегося платежа за подписку в течение трех (3) календарных дней с момента транзакции, но только если вы не достигли пробного порога в три (3) использования Сервиса (генерация текста) с момента платежа. Подробнее в Условиях использования."
  }
];

export function Support() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [foundAnswer, setFoundAnswer] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: ""
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log("Form submitted:", formData);
    // Сбросить форму после отправки
    setFormData({
      email: "",
      subject: "",
      message: ""
    });
    // Показать сообщение об успешной отправке
    setFoundAnswer(null);
  };

  const handleFeedback = (found: boolean) => {
    setFoundAnswer(found);
  };

  return (
    <>
      <Head>
        <title>Поддержка - DreamTeamSAAS</title>
        <meta name="description" content="Получите помощь и ответы на вопросы о сервисе DreamTeamSAAS" />
        {/* Дополнительные шрифты для страницы поддержки */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </Head>

      <section className="py-20 sm:py-24 md:py-28 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 font-['Inter'] relative overflow-hidden">
        {/* Фоновый паттерн */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            Есть вопрос? Спросите команду DreamTeamSAAS!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Только для поддержки.
          </p>
          <div className="flex justify-center">
            <Button color="light" onClick={() => window.location.href = "/"} className="group">
              <span className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold">Чтобы начать писать</span>
                <span className="font-bold underline hover:no-underline flex items-center gap-1">
                  нажмите здесь
                  <ArrowRight className="w-4 h-4" />
                </span>
              </span>
            </Button>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">Часто задаваемые вопросы</h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 group"
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform"
                  >
                    {openFaq === index ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6 border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-blue-50/30">
                    <div className="pt-6">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 md:p-12 border border-gray-200/50 hover:shadow-3xl transition-all duration-500"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">Не нашли ответ на свой вопрос?</h2>
            <p className="text-lg text-gray-600">Напишите нам, и мы поможем вам в кратчайшие сроки</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-3">
                  Email адрес
                </label>
                <TextInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-800 mb-3">
                  Тема обращения
                </label>
                <TextInput
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Кратко опишите вашу проблему"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-3">
                Сообщение
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                placeholder="Подробно опишите вашу проблему или вопрос..."
              />
            </div>

            <div className="text-center pt-4">
              <Button type="submit" color="blue" size="lg">
                Отправить сообщение
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Satisfaction Survey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">Нашли ли вы ответ на свой вопрос?</h3>
          <div className="flex justify-center gap-6">
            <Button color="success" outline onClick={() => handleFeedback(true)}>
              ✅ Да
            </Button>
            <Button color="failure" outline onClick={() => handleFeedback(false)}>
              ❌ Нет
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}
