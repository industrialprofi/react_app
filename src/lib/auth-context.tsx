"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import config from './config';

// Интерфейсы для типов
interface User {
  id: number;
  email: string;
  username?: string;
  email_verified: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Создаем контекст
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Провайдер аутентификации
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем токен из localStorage при монтировании
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      // Загружаем информацию о пользователе
      fetchUserInfo(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Функция загрузки информации о пользователе
  const fetchUserInfo = async (authToken: string) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Токен недействителен, удаляем
        logout();
      }
    } catch (error) {
      console.error('Ошибка загрузки пользователя:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  // Функция входа
  const login = async (email: string, password: string): Promise<void> => {
    const response = await fetch(`${config.API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Ошибка входа');
    }

    const data = await response.json();
    const newToken = data.access_token;

    // Сохраняем токен и загружаем пользователя
    localStorage.setItem('auth_token', newToken);
    setToken(newToken);
    await fetchUserInfo(newToken);
  };

  // Функция регистрации
  const register = async (email: string, username: string, password: string): Promise<void> => {
    const response = await fetch(`${config.API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Ошибка регистрации');
    }

    // Регистрация успешна, но пользователь должен подтвердить email
    // Не логиним автоматически
  };

  // Функция выхода
  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Хук для использования контекста
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
}