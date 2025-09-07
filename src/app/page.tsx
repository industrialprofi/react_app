'use client';

import { motion } from 'framer-motion';
import { Bot, MessageSquare, LogIn, UserPlus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle OAuth callback that may redirect to the root with token params
  useEffect(() => {
    const token = searchParams.get('token');
    const tokenType = searchParams.get('token_type');
    const error = searchParams.get('error');

    if (error) {
      // Redirect to login on error
      router.push('/auth/login');
      return;
    }

    if (token && tokenType === 'bearer') {
      localStorage.setItem('auth_token', token);
      router.push('/dashboard');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">AI Assistant</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/auth/login')}
              className="flex items-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Войти</span>
            </Button>
            <Button 
              onClick={() => router.push('/auth/register')}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="w-4 h-4" />
              <span>Регистрация</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full">
                <Sparkles className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Умный AI Помощник
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Общайтесь с искусственным интеллектом, создавайте контент и управляйте своими разговорами в одном месте
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg"
                onClick={() => router.push('/auth/register')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Начать общение
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => router.push('/auth/login')}
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
              >
                Войти в аккаунт
              </Button>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mt-16"
          >
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <MessageSquare className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">AI Чат</h3>
              <p className="text-gray-600">Общайтесь с продвинутым ИИ в реальном времени</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Bot className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">История разговоров</h3>
              <p className="text-gray-600">Сохраняйте и управляйте всеми вашими беседами</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Sparkles className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Подписки</h3>
              <p className="text-gray-600">Выберите план, подходящий вашим потребностям</p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
