"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { FileText, RefreshCw, Book } from "lucide-react";

const features = [
  {
    title: "Сочинения и эссе",
    description: "Пишите работы за минуты вместо часов. Просто укажите тему и получите готовый текст.",
    icon: FileText,
    delay: 0.1,
  },
  {
    title: "Переписывание текста",
    description: "Обновляйте текст, сохраняя смысл. Идеально для рерайтинга статей и адаптации контента.",
    icon: RefreshCw,
    delay: 0.3,
  },
  {
    title: "Рефераты и доклады",
    description: "Готовые материалы по любой теме с правильной структурой и цитированием источников.",
    icon: Book,
    delay: 0.5,
  },
];

export function Features() {
  return (
    <section id="возможности" className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Возможности TextAI</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Наш искусственный интеллект поможет вам создавать качественные тексты для любых целей
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex"
            >
              <Card className="h-full w-full flex flex-col">
                <CardHeader className="flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 sm:mb-4">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563eb]" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-1 w-10 sm:w-12 bg-[#2563eb] rounded-full"></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
