import { render, screen, fireEvent, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '@/__tests__/test-utils/mock-config';
import { useEffect } from 'react';
import '@testing-library/jest-dom';

// Test component that uses the auth context
const TestComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();

  return (
    <div>
      <div data-testid="user-email">{user?.email || 'No user'}</div>
      <div data-testid="is-authenticated">{isAuthenticated ? 'true' : 'false'}</div>
      <button onClick={() => login('test@example.com', 'password123')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
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

  it('handles logout', async () => {
    // Set initial token in localStorage
    localStorage.setItem('auth_token', 'test-token');

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Click logout button
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    await act(async () => {
      fireEvent.click(logoutButton);
    });

    // Check if user is logged out
    expect(screen.getByTestId('user-email')).toHaveTextContent('No user');
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    
    // Check if token is removed from localStorage
    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('loads user from token on mount', async () => {
    // Set initial token in localStorage
    localStorage.setItem('auth_token', 'test-token');

    // Mock user data response
    server.use(
      http.get(`${API_BASE_URL}/users/me`, async () => {
        return HttpResponse.json({
          id: 1,
          email: 'test@example.com',
          is_active: true,
          is_superuser: false,
        });
      })
    );

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    // Check if user is loaded
    expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com');
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
  });
});
