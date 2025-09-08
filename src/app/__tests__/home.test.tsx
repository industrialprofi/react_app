import { render, screen, fireEvent } from '@/test-utils';
import Home from '../page';

// Access the global mock router
declare global {
  var __mockRouter: {
    push: jest.Mock;
    replace: jest.Mock;
    prefetch: jest.Mock;
  };
}

describe('Home Page', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    globalThis.__mockRouter.push.mockClear();
    globalThis.__mockRouter.replace.mockClear();
    globalThis.__mockRouter.prefetch.mockClear();
  });

  it('renders the hero section with current content', () => {
    render(<Home />);

    // main heading
    expect(screen.getByRole('heading', { name: /Умный AI Помощник/i })).toBeInTheDocument();

    // subheading
    expect(
      screen.getByText(/Общайтесь с искусственным интеллектом, создавайте контент/i)
    ).toBeInTheDocument();

    // CTA buttons
    expect(screen.getByRole('button', { name: /Начать общение/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Войти в аккаунт/i })).toBeInTheDocument();
  });

  it('has login and register buttons', () => {
    render(<Home />);

    // Check that login and register buttons exist
    expect(screen.getAllByText(/Войти/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Регистрация/i).length).toBeGreaterThan(0);
  });

  it('shows feature cards', () => {
    render(<Home />);
    const featureCards = screen.getAllByRole('heading', { level: 3 });
    expect(featureCards.length).toBeGreaterThan(0);
  });
});
