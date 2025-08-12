"use client";

import { Button } from "../ui/button";
import { AnimatedSection } from "../ui/animated-section";

export function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
          <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
            <AnimatedSection direction="up" delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Генерация качественных текстов с помощью ИИ
              </h1>
            </AnimatedSection>
            
            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Создавайте уникальные, качественные и разнообразные тексты за секунды без лишних усилий
              </p>
            </AnimatedSection>
            
            <AnimatedSection direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="px-6 sm:px-8 w-full sm:w-auto">
                  Начать бесплатно
                </Button>
                <Button variant="outline" size="lg" className="px-6 sm:px-8 w-full sm:w-auto">
                  Узнать больше
                </Button>
              </div>
            </AnimatedSection>
          </div>
          
          <AnimatedSection direction="left" delay={0.4} className="w-full lg:w-1/2">
            <div className="relative">
              <div className="w-full h-full bg-gradient-to-tr from-primary/60 to-accent/60 absolute rounded-full blur-3xl opacity-20 -z-10"></div>
              <div className="relative bg-card rounded-2xl shadow-xl p-4 md:p-8 border border-border">
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 md:p-6 border border-border/50">
                  <div className="space-y-4 font-mono text-sm sm:text-base">
                    <p>
                      <span className="text-primary font-semibold">&gt;</span> <span className="text-foreground">Здравствуйте! Я текстовый ассистент на базе искусственного интеллекта.</span>
                    </p>
                    <p>
                      <span className="text-primary font-semibold">&gt;</span> <span className="text-foreground">Чем могу помочь? Я умею писать тексты любого формата: от коротких описаний до полноценных статей.</span>
                    </p>
                    <p className="flex items-center">
                      <span className="text-accent font-semibold mr-1 animate-pulse">&gt;</span> 
                      <span className="block animate-pulse text-muted-foreground">Введите запрос...</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
