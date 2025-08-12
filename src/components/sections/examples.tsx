"use client";

export function Examples() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Первый блок - желтая рамка */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="border-4 border-yellow-400 rounded-2xl p-6 bg-white shadow-lg">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-3 rounded border">
                      <p className="font-medium">ИИ Анализ темы мести в Бранденбургских Марках</p>
                      <p className="text-gray-600 text-xs mt-1">Это эссе исследует тему мести...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-3xl font-bold text-black mb-4">
                Просмотрите базу данных 10М+
              </h3>
              <p className="text-gray-600 text-lg">
                Получите доступ к тысячам академических источников бесплатно. Найдите 
                все, что вам нужно для поддержки ваших исследований.
              </p>
            </div>
          </div>
        </div>

        {/* Второй блок - фиолетовая рамка */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <div className="border-4 border-purple-400 rounded-2xl p-6 bg-white shadow-lg">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-3 text-gray-700">Создавайте сильные структуры</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Разработайте четкий, логический план для вашей работы. ИИ поможет организовать 
                    разделы так, чтобы они были хорошо структурированы и последовательны.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">1. Негативные эффекты социальных сетей на психическое здоровье</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">2. Кибербуллинг и онлайн-домогательства</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">3. Страх упустить что-то (FOMO)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-3xl font-bold text-black mb-4">
                Создавайте сильные структуры
              </h3>
              <p className="text-gray-600 text-lg">
                Разработайте четкий, логический план для вашей работы. ИИ поможет организовать 
                разделы так, чтобы они были хорошо структурированы и последовательны.
              </p>
            </div>
          </div>
        </div>

        {/* Третий блок - зеленая рамка */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="border-4 border-green-400 rounded-2xl p-6 bg-white shadow-lg">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-3 text-gray-700">Пишите без препятствий</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Получите помощь для аргументов, дополнительные детали, перефразирование и редактирование. 
                    Вы можете редактировать и переписывать без препятствий.
                  </p>
                  <div className="bg-white p-3 rounded border text-xs">
                    <p className="mb-2">
                      <strong className="text-gray-700">Исследование показало, что социальные сети могут оказывать как положительное, 
                      так и отрицательное влияние на психическое здоровье подростков...</strong>
                    </p>
                    <p className="text-gray-500">
                      Источники: Johnson, A. B. (2023). Социальные сети и психическое здоровье подростков...
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-3xl font-bold text-black mb-4">
                Пишите без препятствий
              </h3>
              <p className="text-gray-600 text-lg">
                Получите помощь для аргументов, дополнительные детали, перефразирование и редактирование. 
                Вы можете редактировать и переписывать без препятствий.
              </p>
            </div>
          </div>
        </div>

        {/* Четвертый блок - оранжевая рамка */}
        <div>
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <div className="border-4 border-orange-400 rounded-2xl p-6 bg-white shadow-lg">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-3 text-gray-700">Создавайте списки литературы</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Генерируйте и обновляйте цитаты в MLA, APA, Чикаго и других стилях — 
                    автоматически отформатированные для точности.
                  </p>
                  <div className="bg-white p-3 rounded border text-xs space-y-2">
                    <div>
                      <strong className="text-gray-700">Источники:</strong>
                    </div>
                    <div className="text-gray-700">
                      <p>Boyd, D. M., & Ellison, N. B. (2007). Социальные сетевые сайты...</p>
                      <p>Primack, B. A., & Escobar-Viera, C. G. (2017). Социальные сети и депрессия...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-3xl font-bold text-black mb-4">
                Создавайте списки литературы
              </h3>
              <p className="text-gray-600 text-lg">
                Генерируйте и обновляйте цитаты в MLA, APA, Чикаго и других стилях — 
                автоматически отформатированные для точности.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
