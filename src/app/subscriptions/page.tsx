'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Crown, Check, ArrowLeft, User } from 'lucide-react';
import { Button, Spinner } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import config from '@/lib/config';
import { getAuthHeaders } from '@/lib/api';

interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  description?: string;
  features: string[];
  requests_per_day: number;
  requests_per_month: number;
}

interface UserSubscription {
  id: number;
  active: boolean;
  created_at: string;
  plan: SubscriptionPlan;
}

export default function SubscriptionsPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    loadData();
  }, [router]);

  const loadData = async () => {
    try {
      // Load user data
      const userResponse = await fetch(`${config.API_BASE_URL}/auth/me`, {
        headers: getAuthHeaders()
      });
      if (userResponse.ok) {
        setUser(await userResponse.json());
      } else if (userResponse.status === 401) {
        localStorage.removeItem('auth_token');
        router.push('/auth/login');
        return;
      }

      // Load subscription plans
      const plansResponse = await fetch(`${config.API_BASE_URL}/subscriptions/plans`);
      if (plansResponse.ok) {
        setPlans(await plansResponse.json());
      }

      // Load current subscription
      const subscriptionResponse = await fetch(`${config.API_BASE_URL}/subscriptions/my-subscription`, {
        headers: getAuthHeaders()
      });
      if (subscriptionResponse.ok) {
        setCurrentSubscription(await subscriptionResponse.json());
      } else if (subscriptionResponse.status === 404) {
        // No active subscription — leave as null
        setCurrentSubscription(null);
      } else if (subscriptionResponse.status === 401) {
        localStorage.removeItem('auth_token');
        router.push('/auth/login');
        return;
      }
    } catch (error) {
      console.error('Error loading subscription data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button color="light" onClick={() => router.push('/dashboard')} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Назад</span>
              </Button>
              <div className="flex items-center space-x-2">
                <Bot className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">AI Assistant</span>
              </div>
            </div>
            
            {user && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {user.username || user.email}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full">
                <Crown className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Управление подпиской
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Выберите план, который подходит вашим потребностям в общении с ИИ
            </p>
          </motion.div>
        </div>

        {/* Current Subscription */}
        {currentSubscription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-12"
          >
            <div className="bg-white rounded-lg shadow-sm border-2 border-blue-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Текущая подписка: {currentSubscription.plan.name}
                  </h3>
                  <p className="text-gray-600">
                    {currentSubscription.plan.requests_per_day} запросов в день, {currentSubscription.plan.requests_per_month} в месяц
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Активна с {new Date(currentSubscription.created_at).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {currentSubscription.plan.price === 0 ? 'Бесплатно' : `$${currentSubscription.plan.price}/мес`}
                  </div>
                  <div className="text-green-600 text-sm font-medium">Активна</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Subscription Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => {
            const isCurrentPlan = currentSubscription?.plan.id === plan.id;
            const isFree = plan.price === 0;
            
            return (
              <div
                key={plan.id}
                className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-300 hover:shadow-md ${
                  isCurrentPlan 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {isFree ? 'Бесплатно' : `$${plan.price}`}
                      {!isFree && <span className="text-lg text-gray-500">/мес</span>}
                    </div>
                    {plan.description && (
                      <p className="text-gray-600 text-sm">{plan.description}</p>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>{plan.requests_per_day} запросов в день</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>{plan.requests_per_month} запросов в месяц</span>
                    </div>
                    {plan.features?.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button color={isCurrentPlan ? 'success' : 'blue'} className="w-full" disabled={isCurrentPlan}>
                    {isCurrentPlan ? 'Текущий план' : 'Выбрать план'}
                  </Button>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Часто задаваемые вопросы
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Что включает бесплатный план?</h4>
                <p className="text-gray-600 text-sm">
                  Бесплатный план позволяет делать ограниченное количество запросов к ИИ каждый день.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Можно ли изменить план?</h4>
                <p className="text-gray-600 text-sm">
                  Да, вы можете изменить свой план в любое время. Изменения вступят в силу немедленно.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Что происходит при превышении лимита?</h4>
                <p className="text-gray-600 text-sm">
                  При превышении дневного лимита запросов вам будет предложено обновить план.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Безопасны ли платежи?</h4>
                <p className="text-gray-600 text-sm">
                  Все платежи обрабатываются через защищенные платежные системы с шифрованием данных.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
