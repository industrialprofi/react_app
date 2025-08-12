"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";

export function CTA() {
  return (
    <section className="py-14 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#2563eb] to-[#4f46e5] rounded-lg sm:rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-12 text-center text-white max-w-5xl mx-auto shadow-lg"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Начните создавать тексты прямо сейчас
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-0 sm:px-4">
            Присоединяйтесь к тысячам пользователей, которые уже экономят время и создают качественный контент с помощью искусственного интеллекта
          </p>
          <Button
            size="default"
            className="bg-white text-[#2563eb] hover:bg-white/90 px-6 py-2 sm:px-8 sm:py-2 text-sm sm:text-base font-medium"
          >
            Попробовать бесплатно
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
