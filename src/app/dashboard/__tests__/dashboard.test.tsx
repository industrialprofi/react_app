import { render, screen, waitFor, fireEvent } from '@/test-utils';
import DashboardPage from '../page';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '@/__tests__/test-utils/mock-config';

// Enable API mocking before tests
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

describe('Dashboard Page (Chat)', () => {
  beforeEach(() => {
    // Ensure token is present
    localStorage.setItem('auth_token', 'test-token');

    // Default handlers for user and conversations
    server.use(
      http.get(`${API_BASE_URL}/auth/me`, () => {
        return HttpResponse.json({ id: 1, email: 'test@example.com' });
      }),
      http.get(`${API_BASE_URL}/conversations`, () => {
        return HttpResponse.json([
          { id: 1, title: 'Чат 1', created_at: new Date().toISOString(), messages: [] },
          { id: 2, title: 'Чат 2', created_at: new Date().toISOString(), messages: [] },
        ]);
      })
    );
  });

  it('renders conversations list and New Chat button', async () => {
    render(<DashboardPage />);

    // Wait for conversations to load and be displayed in sidebar
    await waitFor(() => {
      expect(screen.getByText('Чат 1')).toBeInTheDocument();
      expect(screen.getByText('Чат 2')).toBeInTheDocument();
    });

    // New chat button is visible (check that at least one exists)
    expect(screen.getAllByText(/Новый чат/i).length).toBeGreaterThan(0);
  });

  it('renders dashboard with conversations', async () => {
    render(<DashboardPage />);

    // Wait for conversations to load
    await waitFor(() => {
      expect(screen.getByText('Чат 1')).toBeInTheDocument();
      expect(screen.getByText('Чат 2')).toBeInTheDocument();
    });

    // Check that new chat button exists
    expect(screen.getAllByText(/Новый чат/i).length).toBeGreaterThan(0);
  });
});
