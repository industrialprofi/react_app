import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../lib/auth-context";
import React from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DreamTeamSAAS - ИИ помощник для написания эссе",
  description: "Ваше эссе — написано на 90% быстрее с помощью ИИ. Быстрая структура, проверка оригинальности, бесплатные источники с PDF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {/* Оборачиваем приложение в AuthProvider для управления аутентификацией */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
