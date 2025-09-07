"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, TextInput, Label, Alert, Spinner } from "flowbite-react";
import { Eye, EyeOff, Mail, Lock, User, Chrome } from "lucide-react";
import { useAuth } from "../../lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login, register, isAuthenticated } = useAuth();
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

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push('/dashboard');
    return null;
  }

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

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        setSuccessMessage('Вход выполнен успешно!');
        // Redirect will happen automatically due to isAuthenticated check
        setTimeout(() => router.push('/dashboard'), 1000);
      } else {
        await register(formData.email, formData.username, formData.password);
        setSuccessMessage('Регистрация прошла успешно! Проверьте свою почту для подтверждения.');
        // Switch to login form after successful registration
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/login/google`;
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
              {isLogin ? "Введите данные для входа" : "Присоединяйтесь сегодня"}
            </p>
          </div>

          <div className="p-8 pt-0">
            {error && (
              <Alert color="failure" className="mb-6">
                {error}
              </Alert>
            )}
            {successMessage && (
              <Alert color="success" className="mb-6">
                {successMessage}
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <TextInput type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required className="w-full pl-12 pr-4 py-4 rounded-2xl" placeholder="Имя пользователя" />
                  </div>
                </div>
              )}
              <div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <TextInput type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full pl-12 pr-4 py-4 rounded-2xl" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <TextInput type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleInputChange} required className="w-full pl-12 pr-12 py-4 rounded-2xl" placeholder="Пароль" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {!isLogin && (
                <div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <TextInput type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required className="w-full pl-12 pr-4 py-4 rounded-2xl" placeholder="Подтвердите пароль" />
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
              <Button type="submit" color="blue" disabled={isLoading} className="w-full py-4 rounded-2xl text-lg font-semibold">
                {isLoading ? (
                  <span className="flex items-center gap-2"><Spinner size="sm" /> Обработка...</span>
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
