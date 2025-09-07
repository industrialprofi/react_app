import { render, screen, waitFor, fireEvent } from '@/test-utils';
import LoginPage from '../page';
import { server } from '@/mocks/server';
import { rest } from 'msw';
import { API_BASE_URL } from '@/__tests__/test-utils/mock-config';

type MockRequest = {
  body: {
    email: string;
    password: string;
  };
};

type MockResponse = {
  (status: number, data: any, headers?: Record<string, string>): any;
  json: (data: any) => any;
};

type MockContext = {
  status: (code: number) => MockContext;
  json: (data: any) => any;
};

// Enable API mocking before tests
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers());

// Clean up after all tests are done
afterAll(() => server.close());

describe('Login Page', () => {
  it('renders login form', () => {
    render(<LoginPage />);
    
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Войти/i })).toBeInTheDocument();
    expect(screen.getByText(/Нет аккаунта?/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Зарегистрироваться/i })).toBeInTheDocument();
  });

  it('allows users to login successfully', async () => {
    const mockPush = jest.fn();
    render(<LoginPage />, { router: { router: { push: mockPush } } as any });
    
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
    
    // Wait for the login to complete
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('shows error message when login fails', async () => {
    // Override the default handler for this test
    server.use(
      rest.post(`${API_BASE_URL}/auth/login`, async (req: MockRequest, res: any, ctx: any) => {
        return res(
          ctx.status(401),
          ctx.json({
            detail: 'Invalid credentials',
          })
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
