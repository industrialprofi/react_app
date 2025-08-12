"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook, Github } from "lucide-react";

const footerLinks = [
  {
    title: "Компания",
    links: [
      { name: "О нас", href: "#" },
      { name: "Карьера", href: "#" },
      { name: "Блог", href: "#" },
      { name: "Контакты", href: "#контакты" }
    ]
  },
  {
    title: "Ресурсы",
    links: [
      { name: "Руководство", href: "#" },
      { name: "Примеры", href: "#" },
      { name: "Часто задаваемые вопросы", href: "#" }
    ]
  },
  {
    title: "Правовая информация",
    links: [
      { name: "Политика конфиденциальности", href: "#" },
      { name: "Условия использования", href: "#" },
      { name: "Правила сервиса", href: "#" }
    ]
  }
];

const socialLinks = [
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Github, href: "#", label: "Github" }
];

export function Footer() {
  return (
    <footer id="контакты" className="bg-gray-50 py-10 sm:py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Логотип и описание */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="font-bold text-xl sm:text-2xl text-[#2563eb] mb-3 sm:mb-4 inline-block">
              TextAI
            </Link>
            <p className="text-sm sm:text-base text-gray-600 mt-2 mb-4 sm:mb-6 max-w-md">
              Используйте силу искусственного интеллекта для создания качественных текстов любой сложности и тематики.
            </p>
            <div className="flex space-x-4 mb-6 sm:mb-0">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-500 hover:text-[#2563eb] transition-colors p-1"
                >
                  <social.Icon size={18} className="sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Ссылки */}
          {footerLinks.map((column, index) => (
            <div key={index} className="mt-4 sm:mt-0">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-3 sm:mb-4">{column.title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-gray-600 hover:text-[#2563eb] transition-colors block py-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-0 text-center md:text-left">
            &copy; {new Date().getFullYear()} TextAI. Все права защищены.
          </p>
          <div className="text-xs sm:text-sm text-gray-500 text-center md:text-right">
            Разработано с ❤️ в России
          </div>
        </div>
      </div>
    </footer>
  );
}
