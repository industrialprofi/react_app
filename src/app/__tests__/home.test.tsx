import { render, screen, fireEvent } from '@/test-utils';
import Home from '../page';

describe('Home Page', () => {
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

  it('navigates to login when clicking the login button', () => {
    const mockPush = jest.fn();
    render(<Home />, { router: { router: { push: mockPush } } as any });

    const loginButton = screen.getByRole('button', { name: /Войти в аккаунт/i });
    fireEvent.click(loginButton);

    expect(mockPush).toHaveBeenCalledWith('/auth/login');
  });

  it('navigates to register when clicking the register button', () => {
    const mockPush = jest.fn();
    render(<Home />, { router: { router: { push: mockPush } } as any });

    const registerButton = screen.getByRole('button', { name: /Начать общение/i });
    fireEvent.click(registerButton);

    expect(mockPush).toHaveBeenCalledWith('/auth/register');
  });

  it('shows feature cards', () => {
    render(<Home />);
    const featureCards = screen.getAllByRole('heading', { level: 3 });
    expect(featureCards.length).toBeGreaterThan(0);
  });
});
