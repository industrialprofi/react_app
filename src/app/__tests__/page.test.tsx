import { render, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Home from '../page';

// Мокаем next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Home Page', () => {
  beforeEach(() => {
    // Сбрасываем все моки перед каждым тестом
    jest.clearAllMocks();
    
    // Настраиваем мок useRouter
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    
    // Настраиваем мок useSearchParams
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it('renders the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { level: 1, name: /Умный AI Помощник/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the main description', () => {
    render(<Home />);
    const description = screen.getByText(/Общайтесь с искусственным интеллектом, создавайте контент и управляйте своими разговорами в одном месте/i);
    expect(description).toBeInTheDocument();
  });

  it('renders login and register buttons', () => {
    render(<Home />);
    const loginButton = screen.getByRole('button', { name: /Войти в аккаунт/i });
    const registerButton = screen.getByRole('button', { name: /Начать общение/i });
    
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Home />);
    const mainLink = screen.getByRole('link', { name: /Главная/i });
    const pricingLink = screen.getByRole('link', { name: /Тарифы/i });
    const supportLink = screen.getByRole('link', { name: /Поддержка/i });
    
    expect(mainLink).toBeInTheDocument();
    expect(pricingLink).toBeInTheDocument();
    expect(supportLink).toBeInTheDocument();
  });
});
