"use client";

export function Examples() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Первый блок - База данных */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="border-4 border-yellow-400 rounded-xl p-6 bg-white shadow-lg">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <p className="font-medium text-gray-900">Поиск источников по теме "Искусственный интеллект в образовании"</p>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-xs text-gray-700">Smith, J. (2023). Применение ИИ в современном образовании</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-xs text-gray-700">Петров А.В. (2022). Искусственный интеллект как инструмент персонализации обучения</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Доступ к базе данных 10М+
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Получите доступ к реальным, проверенным академическим источникам бесплатно. 
                Найдите всё необходимое для поддержки вашего исследования с помощью 
                нашей обширной базы данных научных работ.
              </p>
              <button className="mt-4 text-blue-600 font-medium hover:text-blue-800 flex items-center">
                Исследовать базу данных
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Второй блок - Структуры */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <div className="border-4 border-blue-400 rounded-xl p-6 bg-white shadow-lg">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-3 text-gray-900">Создание структуры эссе</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Разработайте четкий, логический план для вашей работы с помощью ИИ-ассистента.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700 font-medium">Введение</span>
                    </div>
                    <div className="pl-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span className="text-xs text-gray-600">Определение проблемы</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span className="text-xs text-gray-600">Актуальность темы</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700 font-medium">Основная часть</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700 font-medium">Заключение</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Создавайте сильные структуры
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Разработайте четкий, логический план для вашей работы. ИИ предложит 
                оптимальную структуру разделов, обеспечивая логичность и полноту 
                вашего текста.
              </p>
              <button className="mt-4 text-blue-600 font-medium hover:text-blue-800 flex items-center">
                Узнать больше
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Третий блок - Письмо без препятствий */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="border-4 border-green-400 rounded-xl p-6 bg-white shadow-lg">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-3 text-gray-900">Интеллектуальный помощник</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Получите помощь с аргументацией, дополнительными деталями и редактированием текста.
                  </p>
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <p className="mb-3 text-sm text-gray-800">
                      <span className="font-medium">Ваш текст:</span> Социальные сети влияют на психическое здоровье подростков.
                    </p>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-gray-700">
                        <span className="font-medium text-blue-700">ИИ предлагает:</span> Исследования показывают, что социальные сети могут оказывать как положительное, 
                        так и отрицательное влияние на психическое здоровье подростков. С одной стороны, они обеспечивают 
                        социальную поддержку и чувство принадлежности, с другой — могут способствовать развитию тревожности, 
                        депрессии и проблем с самооценкой.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Пишите без препятствий
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Получите помощь с аргументацией, дополнительными деталями, перефразированием 
                и редактированием. Сосредоточьтесь на содержании, не отвлекаясь на 
                технические аспекты письма.
              </p>
              <button className="mt-4 text-blue-600 font-medium hover:text-blue-800 flex items-center">
                Попробовать сейчас
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Четвертый блок - Списки литературы */}
        <div>
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <div className="border-4 border-purple-400 rounded-xl p-6 bg-white shadow-lg">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-3 text-gray-900">Автоматическое цитирование</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Генерируйте и обновляйте цитаты в различных форматах — автоматически 
                    отформатированные для точного соответствия требованиям.
                  </p>
                  <div className="bg-white p-4 rounded border border-gray-200 space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-900">Формат APA:</p>
                      <p className="text-xs text-gray-700">Смирнов, А. В. (2022). Влияние цифровизации на образовательные процессы. Журнал педагогических исследований, 45(2), 112-128.</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">Формат MLA:</p>
                      <p className="text-xs text-gray-700">Смирнов, Алексей Владимирович. "Влияние цифровизации на образовательные процессы." Журнал педагогических исследований, том 45, № 2, 2022, с. 112-128.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Создавайте списки литературы
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Генерируйте и обновляйте цитаты в форматах MLA, APA, Chicago и других — 
                автоматически отформатированные для точного соответствия академическим 
                требованиям.
              </p>
              <button className="mt-4 text-blue-600 font-medium hover:text-blue-800 flex items-center">
                Создать список литературы
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
