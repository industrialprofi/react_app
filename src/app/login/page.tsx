"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Eye, EyeOff, Mail, Lock, User, Chrome } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      setIsLoading(false);
      return;
    }

    const endpoint = isLogin ? `${API_URL}/auth/login` : `${API_URL}/auth/register`;
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { email: formData.email, username: formData.username, password: formData.password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Произошла ошибка');
      }

      if (isLogin) {
        // TODO: Handle successful login (e.g., save token, redirect)
        setSuccessMessage('Вход выполнен успешно!');
        console.log('Login successful:', data);
      } else {
        setSuccessMessage(data.message || 'Регистрация прошла успешно! Проверьте свою почту для подтверждения.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleAuth = () => {
    window.location.href = `${API_URL}/auth/login/google`;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 50%, #dbeafe, transparent 40%), radial-gradient(circle at 85% 30%, #ede9fe, transparent 40%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-2">
              {isLogin ? "Вход" : "Создать аккаунт"}
            </h1>
            <p className="text-gray-600">
              {isLogin ? "Введите данные для входа" : "Присоединяйтесь к нам сегодня"}
            </p>
          </div>

          <div className="p-8 pt-0">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6 text-sm">
                    {error}
                </div>
            )}
            {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl mb-6 text-sm">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <div className="relative">
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400" placeholder="Имя пользователя" />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              )}
              <div>
                <div className="relative">
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400" placeholder="your@email.com" />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleInputChange} required className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400" placeholder="Пароль" />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {!isLogin && (
                <div>
                  <div className="relative">
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400" placeholder="Подтвердите пароль" />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              )}
              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-sm text-blue-600 hover:underline font-medium">
                    Забыли пароль?
                  </button>
                </div>
              )}
              <Button type="submit" disabled={isLoading} className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:scale-100">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Обработка...
                  </div>
                ) : (isLogin ? "Войти" : "Создать аккаунт")}
              </Button>
            </form>


            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
                <button type="button" onClick={() => { setIsLogin(!isLogin); setError(null); setSuccessMessage(null); }} className="ml-2 text-blue-600 hover:underline font-semibold">
                  {isLogin ? "Зарегистрироваться" : "Войти"}
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-700 hover:underline">
            ← Вернуться на главную
          </a>
        </div>
      </motion.div>
    </div>
  );
}
