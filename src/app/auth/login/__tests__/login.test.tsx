import { render, screen, waitFor, fireEvent } from '@/test-utils';
import LoginPage from '../page';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '@/__tests__/test-utils/mock-config';

// Access the global mock router
declare global {
  var __mockRouter: {
    push: jest.Mock;
    replace: jest.Mock;
    prefetch: jest.Mock;
  };
}

// Enable API mocking before tests
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers());

// Clean up after all tests are done
afterAll(() => server.close());

describe('Login Page', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    globalThis.__mockRouter.push.mockClear();
    globalThis.__mockRouter.replace.mockClear();
    globalThis.__mockRouter.prefetch.mockClear();
  });

  it('renders login form', () => {
    render(<LoginPage />);
    
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Войти/i })).toBeInTheDocument();
    expect(screen.getByText(/Нет аккаунта?/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Зарегистрироваться/i })).toBeInTheDocument();
  });

  it('allows users to login successfully', async () => {
    // Mock localStorage
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    
    render(<LoginPage />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText(/Пароль/i), {
      target: { value: 'password123' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Войти/i }));
    
    // Check that the loading state is shown
    expect(await screen.findByText(/Обработка.../i)).toBeInTheDocument();
    
    // Wait for loading to disappear and check that token was stored
    await waitFor(() => {
      expect(screen.queryByText(/Обработка.../i)).not.toBeInTheDocument();
      expect(setItemSpy).toHaveBeenCalledWith('auth_token', 'test-jwt-token');
    }, { timeout: 3000 });
    
    setItemSpy.mockRestore();
  });

  it('shows error message when login fails', async () => {
    // Override the default handler for this test
    server.use(
      http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
        return HttpResponse.json(
          { detail: 'Invalid credentials' },
          { status: 401 }
        );
      })
    );

    render(<LoginPage />);
    
    // Fill in the form with incorrect credentials
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'wrong@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText(/Пароль/i), {
      target: { value: 'wrongpassword' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Войти/i }));
    
    // Check that the error message is shown
    const errorMessage = await screen.findByText(/Invalid credentials/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('navigates to register page when register link is clicked', () => {
    render(<LoginPage />);
    const registerLink = screen.getByRole('link', { name: /Зарегистрироваться/i });
    expect(registerLink).toHaveAttribute('href', '/auth/register');
  });
});
