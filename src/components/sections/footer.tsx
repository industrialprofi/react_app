"use client";

import Link from "next/link";

const footerSections = {
  generators: [
    "Генератор контента",
    "Эссе генератор",
    "ИИ детектор",
    "Генератор",
    "Генератор",
    "Наш исследователь",
    "Поддержка"
  ],
  resources: [
    "Как использовать DreamTeamSAAS",
    "Блог",
    "Примеры",
    "Генератор",
    "Наш исследователь",
    "Поддержка"
  ],
  tools: [
    "Инструмент перефразирования",
    "Инструмент проверки плагиата",
    "Инструмент помощи в письме",
    "Генератор заключений",
    "Генератор цитат",
    "Генератор библиографии",
    "Генератор эссе",
    "Генератор тезисов"
  ],
  citations: [
    "Генератор цитат",
    "Библиографический генератор",
    "MLA генератор цитат",
    "APA генератор цитат",
    "Чикаго генератор цитат",
    "Гарвард генератор цитат",
    "Ванкувер генератор цитат",
    "IEEE генератор цитат",
    "Генератор цитат ACS",
    "Генератор цитат ASA",
    "APSA генератор цитат",
    "Генератор цитат CSE"
  ]
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4 text-white">DreamTeamSAAS</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Сеть для создания исследований и письма с помощью ИИ
            </p>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-white">Генераторы</h4>
              <ul className="space-y-1">
                {footerSections.generators.map((link, index) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-white">Ресурсы</h4>
            <ul className="space-y-1">
              {footerSections.resources.map((link, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-white">Инструменты</h4>
            <ul className="space-y-1">
              {footerSections.tools.map((link, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-white">Генераторы цитат</h4>
            <ul className="space-y-1">
              {footerSections.citations.map((link, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="#" className="hover:text-white">Условия использования</Link>
            <Link href="#" className="hover:text-white">Политика конфиденциальности</Link>
          </div>
          <p>&copy; DreamTeamSAAS 2024</p>
        </div>
      </div>
    </footer>
  );
}
