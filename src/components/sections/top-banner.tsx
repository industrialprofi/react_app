"use client";

import { X } from "lucide-react";
import { useState } from "react";

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-400 text-black py-2 px-4 text-sm relative">
      <div className="container mx-auto text-center">
        <span className="font-medium">
          Ограниченное предложение: ВСЕ эссе за 0₽. Скидка 40%
        </span>
        <span className="ml-4 font-semibold underline cursor-pointer hover:no-underline">
          Последний день!
        </span>
        <span className="ml-4 bg-black text-yellow-400 px-2 py-1 rounded text-xs font-bold">
          Получить
        </span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-black/10 rounded p-1"
      >
        <X size={16} />
      </button>
    </div>
  );
}
