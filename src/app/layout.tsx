import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../lib/auth-context";
import React from "react";

export const metadata: Metadata = {
  title: "DreamTeamSAAS - ИИ-помощник для академической работы",
  description: "Создавайте качественные академические работы за минуты. ИИ поможет с эссе, исследованиями, обзорами литературы и кейс-стади.",
  keywords: "ИИ, академическая работа, эссе, исследования, студенты, образование",
  authors: [{ name: "DreamTeamSAAS" }],
  creator: "DreamTeamSAAS",
  publisher: "DreamTeamSAAS",
  openGraph: {
    title: "DreamTeamSAAS - ИИ-помощник для академической работы",
    description: "Создавайте качественные академические работы за минуты с помощью ИИ",
    url: "https://dreamteamsaas.com",
    siteName: "DreamTeamSAAS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DreamTeamSAAS - ИИ-помощник для студентов",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DreamTeamSAAS - ИИ-помощник для академической работы",
    description: "Создавайте качественные академические работы за минуты с помощью ИИ",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Calibre шрифт для заголовков */}
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        {/* Дополнительные шрифты для лучшей кириллицы */}
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>

      <body
        className="antialiased bg-white text-gray-900 min-h-screen"
      >
        {/* Оборачиваем приложение в AuthProvider для управления аутентификацией */}
        <AuthProvider>
          <div className="relative">
            {/* Градиентный фон для всего приложения */}
            <div className="fixed inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 pointer-events-none" />

            {/* Основной контент */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </AuthProvider>

      </body>
    </html>
  );
}
