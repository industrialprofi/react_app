"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

export function Demo() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  const exampleResult = `Зима - самое волшебное время года, когда природа замирает под белоснежным покрывалом. Деревья, одетые в сверкающий иней, стоят величественно и безмолвно. Снег, падающий с неба мягкими хлопьями, создаёт атмосферу уюта и спокойствия.

В зимнем лесу царит особенная тишина, нарушаемая лишь хрустом снега под ногами редкого путника. Замёрзшие озёра превращаются в природные катки, привлекая любителей зимних развлечений.

Зима - время праздников и тёплых встреч в кругу близких людей. Несмотря на холод за окном, в домах горят огни, создавая ощущение тепла и защищённости.`;

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <section className="py-14 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Попробуйте прямо сейчас</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-1">
            Введите запрос и получите готовый текст за считанные секунды
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20, y: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md"
          >
            <div className="mb-4">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
                Ваш запрос
              </label>
              <textarea
                id="prompt"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent resize-none text-sm sm:text-base"
                rows={4}
                placeholder="Например: Напиши сочинение про зиму"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !prompt.trim()}
              className="w-full"
              size="sm"
            >
              {isGenerating ? "Генерация..." : "Сгенерировать"}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20, y: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md h-full"
          >
            <div className="mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Результат</h3>
              <div className="h-1 w-8 sm:w-10 bg-[#2563eb] my-1 sm:my-2"></div>
            </div>
            <div className="min-h-[180px] sm:min-h-[200px]">
              {showResult ? (
                <p className="text-gray-700 whitespace-pre-line text-sm sm:text-base">{exampleResult}</p>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400 text-center text-sm sm:text-base">
                    {isGenerating ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-[#2563eb]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Генерация текста...
                      </span>
                    ) : (
                      "Здесь появится сгенерированный текст"
                    )}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
