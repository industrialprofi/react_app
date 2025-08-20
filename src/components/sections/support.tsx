"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, MessageCircle, ArrowRight, Plus } from "lucide-react";
import { Button } from "../ui/button";

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
    alert("Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.");
  };

  const handleFeedback = (found: boolean) => {
    setFoundAnswer(found);
  };

  return (
    <section className="py-14 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Есть вопрос? Спросите команду DreamTeamSAAS!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Только для поддержки.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => window.location.href = "/"}
              className="flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2.5 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Чтобы начать писать</span>
              <span className="font-semibold underline hover:no-underline flex items-center gap-1">
                нажмите здесь
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <motion.div
                    id={`faq-content-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
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
          className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Не нашли ответ на свой вопрос?</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email адрес
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Тема обращения
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Кратко опишите вашу проблему"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Сообщение
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                placeholder="Подробно опишите вашу проблему или вопрос..."
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 text-lg font-medium rounded-full"
              size="lg"
            >
              Отправить сообщение
            </Button>
          </form>
        </motion.div>

        {/* Satisfaction Survey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Нашли ли вы ответ на свой вопрос?</h3>
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              className={`px-8 ${foundAnswer === true ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}`}
              onClick={() => handleFeedback(true)}
            >
              Да
            </Button>
            <Button 
              variant="outline" 
              className={`px-8 ${foundAnswer === false ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}`}
              onClick={() => handleFeedback(false)}
            >
              Нет
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
