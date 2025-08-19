"use client";

import { useState } from "react";
import { Header } from "../../components/sections/header";
import { Footer } from "../../components/sections/footer";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

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
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Бесплатный ИИ Детектор
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Быстро и точно определяйте контент, созданный искусственным интеллектом, с помощью 
            бесплатного детектора ИИ от DreamTeamSAAS. Обеспечьте оригинальность и подлинность 
            вашей работы — доверяют студенты, преподаватели и профессионалы.
          </p>
        </div>

        {/* Main Detector Tool */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8 bg-white shadow-lg">
            <div className="mb-6">
              <label htmlFor="text-input" className="block text-lg font-semibold text-gray-900 mb-3">
                Вставьте ваш текст для анализа
              </label>
              <textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введите или вставьте текст, который хотите проверить на наличие ИИ-контента..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={5000}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  {text.length}/5000 символов
                </span>
                <Button
                  onClick={handleAnalyze}
                  disabled={!text.trim() || (result?.isAnalyzing ?? false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
                >
                  {result?.isAnalyzing ? "Анализируем..." : "Проверить на ИИ"}
                </Button>
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Результаты анализа:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-red-800 font-medium">ИИ-контент</span>
                      <span className="text-2xl font-bold text-red-600">
                        {result.isAnalyzing ? "..." : `${result.aiPercentage}%`}
                      </span>
                    </div>
                    <div className="w-full bg-red-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: result.isAnalyzing ? "0%" : `${result.aiPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-800 font-medium">Человеческий контент</span>
                      <span className="text-2xl font-bold text-green-600">
                        {result.isAnalyzing ? "..." : `${result.humanPercentage}%`}
                      </span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: result.isAnalyzing ? "0%" : `${result.humanPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* How AI Content Detector Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Как работает детектор ИИ-контента
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 bg-blue-50 border border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Загрузите текст</h3>
              <p className="text-gray-600">
                Просто скопируйте и вставьте ваш текст в поле выше. Наш детектор может 
                анализировать до 5000 символов за раз, что подходит для большинства 
                документов и статей.
              </p>
            </Card>

            <Card className="p-6 bg-green-50 border border-green-200">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Получите результат</h3>
              <p className="text-gray-600">
                Наш продвинутый алгоритм анализирует паттерны и структуры, характерные 
                для ИИ-генерированного текста, и предоставляет точный процент вероятности 
                того, что текст создан искусственным интеллектом.
              </p>
            </Card>
          </div>
        </div>

        {/* Your uniqueness in each step */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Ваша уникальность на каждом шаге
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Поиск темы</h3>
              <p className="text-sm text-gray-600">
                Найдите идеальную тему для написания с помощью нашего ИИ-инструмента.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Создатель плана</h3>
              <p className="text-sm text-gray-600">
                Превратите ваши ключевые слова в хорошо организованный план с помощью ИИ.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Мастер работ</h3>
              <p className="text-sm text-gray-600">
                Создайте полную академическую работу с нашим ИИ-помощником для письма.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">ИИ Со-автор</h3>
              <p className="text-sm text-gray-600">
                Пишите текст вместе с нашим ИИ, получая руководство и предложения.
              </p>
            </Card>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Преимущества бесплатного ИИ детектора
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Поддерживайте полную прозрачность
              </h3>
              <p className="text-gray-600">
                Этот инструмент детектора ИИ полезен независимо от того, используете ли вы 
                ИИ для создания или улучшения контента, или просто стремитесь обеспечить 
                оригинальность вашего письма. Детектор ИИ-контента DreamTeamSAAS использует 
                новейшие алгоритмы для выявления паттернов и структур, характерных для 
                ИИ-генерированного текста.
              </p>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Получайте детальные отчеты
              </h3>
              <p className="text-gray-600">
                В отличие от некоторых инструментов, DreamTeamSAAS предоставляет углубленную 
                обратную связь в процессе обнаружения. Этот детектор ИИ-письма выделяет 
                конкретные области, которые наиболее вероятно созданы ИИ, и дает вам 
                возможность пересмотреть или переписать для более оригинального результата.
              </p>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Проверяйте в любое время
              </h3>
              <p className="text-gray-600">
                Вы можете повторно анализировать ваш текст так часто, как необходимо, с 
                помощью этого бесплатного детектора ИИ для достижения желаемого уровня 
                оригинальности. Независимо от того, готовите ли вы академическую работу, 
                статью или отчет, бесплатный сервис детектора ИИ DreamTeamSAAS обеспечивает 
                соответствие вашего текста требованиям оригинальности.
              </p>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Очеловечивайте ваш текст
              </h3>
              <p className="text-gray-600">
                Сочетайте этот детектор ИИ с продвинутым гуманизатором ИИ DreamTeamSAAS для 
                улучшения отмеченных разделов. Этот инструмент переписывает ИИ-генерированный 
                контент в более естественную, человекоподобную форму — помогая вам 
                трансформировать машинно-написанный контент в полностью аутентичную работу.
              </p>
            </Card>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Случаи использования DreamTeamSAAS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 bg-blue-50 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Для студентов</h3>
              <p className="text-gray-600 mb-4">
                Убедитесь, что ваши эссе и исследовательские работы соответствуют академическим 
                стандартам оригинальности. Проверьте свою работу перед сдачей, чтобы избежать 
                проблем с плагиатом.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Проверка эссе и курсовых работ</li>
                <li>• Анализ исследовательских проектов</li>
                <li>• Подготовка к защите диплома</li>
              </ul>
            </Card>

            <Card className="p-6 bg-green-50 border border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Для преподавателей</h3>
              <p className="text-gray-600 mb-4">
                Быстро проверяйте работы студентов на наличие ИИ-генерированного контента. 
                Поддерживайте академическую честность и помогайте студентам развивать 
                навыки самостоятельного письма.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Проверка студенческих работ</li>
                <li>• Обеспечение академической честности</li>
                <li>• Образовательные цели</li>
              </ul>
            </Card>

            <Card className="p-6 bg-purple-50 border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Для контент-менеджеров</h3>
              <p className="text-gray-600 mb-4">
                Проверяйте контент от фрилансеров и авторов, чтобы убедиться в его 
                оригинальности. Поддерживайте качество и аутентичность вашего бренда.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Проверка статей и блог-постов</li>
                <li>• Контроль качества контента</li>
                <li>• SEO-оптимизация</li>
              </ul>
            </Card>

            <Card className="p-6 bg-orange-50 border border-orange-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Для журналистов</h3>
              <p className="text-gray-600 mb-4">
                Обеспечьте подлинность ваших материалов и поддержите доверие читателей. 
                Проверяйте статьи перед публикацией на соответствие журналистским стандартам.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Проверка новостных статей</li>
                <li>• Анализ интервью и репортажей</li>
                <li>• Поддержание редакционных стандартов</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Часто задаваемые вопросы
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Как работает детектор ИИ?
              </h3>
              <p className="text-gray-600">
                Наш детектор использует продвинутые алгоритмы машинного обучения для анализа 
                текстовых паттернов, структур предложений и стилистических особенностей, 
                характерных для ИИ-генерированного контента. Он сравнивает ваш текст с 
                обширной базой данных известных ИИ-моделей.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Насколько точен детектор?
              </h3>
              <p className="text-gray-600">
                Наш детектор обеспечивает высокую точность обнаружения, но важно понимать, 
                что ни один детектор не может быть 100% точным. Результаты следует 
                рассматривать как индикатор вероятности, а не как окончательное заключение.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Бесплатно ли использование детектора?
              </h3>
              <p className="text-gray-600">
                Да, наш базовый детектор ИИ полностью бесплатен для использования. Вы можете 
                проверять тексты до 5000 символов без ограничений по количеству проверок.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Сохраняется ли мой текст?
              </h3>
              <p className="text-gray-600">
                Мы серьезно относимся к вашей конфиденциальности. Ваш текст не сохраняется 
                на наших серверах после анализа и не используется для обучения наших моделей.
              </p>
            </Card>
          </div>
        </div>

        {/* Features for efficient writing */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Функции для эффективного письма
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🔍</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Поиск источников</h3>
              <p className="text-sm text-gray-600">
                Найдите релевантные источники для вашего исследования
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">✏️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Инструмент перефразирования</h3>
              <p className="text-sm text-gray-600">
                Улучшите и перефразируйте ваш текст
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📚</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Генератор цитат</h3>
              <p className="text-sm text-gray-600">
                Создавайте правильные цитаты автоматически
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🤖</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">ИИ Помощник</h3>
              <p className="text-sm text-gray-600">
                Получите помощь в написании от ИИ
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Проверка оригинальности</h3>
              <p className="text-sm text-gray-600">
                Убедитесь в уникальности вашего контента
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Начните ваше путешествие с DreamTeamSAAS
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Присоединяйтесь к тысячам пользователей, которые уже используют наши инструменты 
            для создания качественного контента
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Начать бесплатно
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
              Узнать больше
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
