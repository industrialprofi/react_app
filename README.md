This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Руководство по установке и запуску на Linux (с нуля)

Ниже — пошаговая инструкция для полностью «чистого» Linux-пк, чтобы запустить фронтенд-приложение `react_app` (Next.js 15 + React 19).

### 1) Предусловия
- Доступ в интернет и терминал Linux (Ubuntu/Debian/WSL подойдут).
- Права пользователя для установки пакетов.

Рекомендуется обновить индекс пакетов:

```bash
sudo apt update
```

Установите инструменты сборки (нужны для некоторых npm-пакетов):

```bash
sudo apt install -y build-essential curl git python3
```

### 2) Установка Node.js через nvm (рекомендуемый способ)
Мы используем Node.js 20 LTS — стабильную и совместимую с Next.js 15.x и React 19.x версию.

1. Установите nvm:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   ```
   Затем перезапустите терминал или загрузите nvm в текущую сессию:
   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
   [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
   ```

2. Установите и активируйте Node.js 20 LTS:
   ```bash
   nvm install 20
   nvm use 20
   node -v   # должен показать v20.x.x
   npm -v    # проверим, что npm установлен
   ```

При желании вы можете позже использовать `nvm use 22` для новой LTS, но для этого проекта рекомендуем 20.x.

### 3) Клонирование проекта (если нужно)
Если у вас нет локальной копии репозитория, выполните:

```bash
git clone <URL_ВАШЕГО_РЕПОЗИТОРИЯ>
cd react_app
```

Если папка уже есть, просто перейдите в директорию проекта `react_app`.

### 4) Установка зависимостей
В проекте используется стандартный `npm` (идёт вместе с Node):

```bash
npm install
```

Альтернативно можно использовать `pnpm` или `yarn`, но для начинающих проще `npm`.

### 5) Переменные окружения
Приложение читает базовый URL вашего Backend API из переменных окружения.

Создайте в корне `react_app` файл `.env.local` и укажите адрес API (пример — локальный бэкенд на 8000 порту):

```bash
touch .env.local
printf "NEXT_PUBLIC_API_BASE_URL=http://localhost:8000\nNEXT_PUBLIC_API_URL=http://localhost:8000\n" > .env.local
```

Пояснения:
- `NEXT_PUBLIC_API_BASE_URL` — основной, рекомендуемый ключ.
- `NEXT_PUBLIC_API_URL` — поддерживается для обратной совместимости. Укажите оба, если не уверены.

Если у вас другой порт/домен бэкенда, подставьте его в эти переменные.

### 6) Запуск в режиме разработки
Запускаем dev-сервер (по умолчанию порт 3000):

```bash
npm run dev
```

После успешного запуска откройте в браузере:

- http://localhost:3000

### 7) Сборка и запуск production-версии
Для проверки «боевой» сборки локально:

```bash
npm run build
npm run start
```

По умолчанию приложение также поднимется на порту 3000.

### 8) Дополнительные команды
- Линтинг кода:
  ```bash
  npm run lint
  ```
- Типы TypeScript:
  ```bash
  npm run type-check
  ```
- Тесты:
  ```bash
  npm test
  ```

### 9) Частые проблемы и их решения
- Порт 3000 занят:
  - Закройте процесс, занимающий порт, либо запустите dev-сервер на другом порту:
    ```bash
    PORT=3001 npm run dev
    ```
- Ошибки при сборке нативных модулей:
  - Убедитесь, что установлены инструменты сборки: `sudo apt install -y build-essential python3`
  - Если используете WSL, убедитесь, что у вас последняя версия WSL и установлен `curl`/`git`.
- Конфликт версий Node:
  - Переключитесь на Node 20 через nvm: `nvm use 20`
  - При необходимости переустановите зависимости после смены версии Node: `rm -rf node_modules package-lock.json && npm install`

### 10) Что внутри проекта
- Фреймворк: Next.js `15.4.6`
- React: `19.1.0`
- Скрипты:
  - `npm run dev` — запуск dev-сервера (Turbopack)
  - `npm run build` — production-сборка
  - `npm run start` — запуск production-сервера
  - `npm run lint`, `npm test`, `npm run type-check` — вспомогательные задачи

Если нужна помощь с настройкой backend части или деплоем — дайте знать.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
