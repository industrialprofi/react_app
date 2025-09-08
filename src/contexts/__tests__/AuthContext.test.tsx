import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { AuthProvider, useAuth } from '../AuthContext';
import { API_BASE_URL } from '@/__tests__/test-utils/mock-config';
import { useEffect } from 'react';
import '@testing-library/jest-dom';

// Mock server setup
const server = setupServer();

// Test component that uses the auth context
const TestComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();

  return (
    <div>
      <div data-testid="user-email">{user?.email || 'No user'}</div>
      <div data-testid="is-authenticated">{isAuthenticated.toString()}</div>
      <button onClick={() => login('test@example.com', 'password')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Clear localStorage
    window.localStorage.clear();
  });

  it('provides initial context values', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user-email')).toHaveTextContent('No user');
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
  });

  it('provides login function', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Login button should be present
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    
    // Initially not authenticated
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
  });

  it('handles successful login', async () => {
    // Mock successful login response
    server.use(
      http.post(`${API_BASE_URL}/auth/login`, async () => {
        return HttpResponse.json({
          access_token: 'test-token',
          token_type: 'bearer',
          user: {
            id: 1,
            email: 'test@example.com',
            is_active: true,
            is_superuser: false,
          },
        });
      })
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Click login button
    const loginButton = screen.getByRole('button', { name: /login/i });
    await act(async () => {
      fireEvent.click(loginButton);
    });

    // Check if user is authenticated
    expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com');
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');

    // Check if token is stored in localStorage
    expect(localStorage.getItem('auth_token')).toBe('test-token');
  });

  it('handles logout', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Logout button should be present
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    
    // Initially not authenticated
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
  });

  it('handles token in localStorage', () => {
    // Set initial token in localStorage
    localStorage.setItem('auth_token', 'test-token');

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Initially shows no user until API call completes
    expect(screen.getByTestId('user-email')).toHaveTextContent('No user');
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
  });
});
