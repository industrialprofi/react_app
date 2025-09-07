import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import LoginPage from '../page';

// Мокаем next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Мокаем глобальные функции
const mockFetch = jest.fn();
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Мокаем config
jest.mock('@/lib/config', () => ({
  API_BASE_URL: 'http://localhost:8000',
}));

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('Login Page', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    // Сбрасываем все моки перед каждым тестом
    jest.clearAllMocks();
    
    // Настраиваем мок useRouter
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    
    // Настраиваем глобальный fetch
    global.fetch = mockFetch as jest.Mock;
  });

  it('renders login form', () => {
    render(<LoginPage />);
    
    // Проверяем наличие основных элементов формы
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Войти/i })).toBeInTheDocument();
    expect(screen.getByText(/Нет аккаунта/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Зарегистрироваться/i })).toBeInTheDocument();
  });

  it('allows entering email and password', () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/Пароль/i) as HTMLInputElement;
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('shows no validation errors on empty form submission', async () => {
    render(<LoginPage />);
    
    const submitButton = screen.getByRole('button', { name: /Войти/i });
    fireEvent.click(submitButton);
    
    // Проверяем, что нет сообщений об ошибках валидации
    // (браузерная валидация не отображается в тестах)
    await waitFor(() => {
      const errorMessages = screen.queryAllByText(/обязателен/i);
      expect(errorMessages).toHaveLength(0);
    });
  });

  it('handles successful login', async () => {
    // Мокаем успешный ответ от сервера
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ access_token: 'test-token' }),
    });
    
    render(<LoginPage />);
    
    // Заполняем форму
    fireEvent.change(screen.getByLabelText(/Email/i), { 
      target: { value: 'test@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/Пароль/i), { 
      target: { value: 'password123' } 
    });
    
    // Отправляем форму
    fireEvent.click(screen.getByRole('button', { name: /Войти/i }));
    
    // Проверяем, что fetch был вызван с правильными параметрами
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
        }),
      });
      
      // Проверяем, что токен сохранен в localStorage
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('auth_token', 'test-token');
      
      // Проверяем, что произошел редирект на /dashboard
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('handles login error', async () => {
    // Мокаем ошибку от сервера
    const errorMessage = 'Неверный email или пароль';
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ detail: errorMessage }),
    });
    
    render(<LoginPage />);
    
    // Заполняем форму
    fireEvent.change(screen.getByLabelText(/Email/i), { 
      target: { value: 'wrong@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/Пароль/i), { 
      target: { value: 'wrongpassword' } 
    });
    
    // Отправляем форму
    fireEvent.click(screen.getByRole('button', { name: /Войти/i }));
    
    // Проверяем, что отображается сообщение об ошибке
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
