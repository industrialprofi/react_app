import { render, screen, waitFor, fireEvent } from '@/test-utils';
import DashboardPage from '../page';
import { server } from '@/mocks/server';
import { rest } from 'msw';
import { API_BASE_URL } from '@/__tests__/test-utils/mock-config';

type MockRequest = {
  body: any;
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
      rest.get(`${API_BASE_URL}/auth/me`, (_req: any, res: any, ctx: any) => {
        return res(
          ctx.status(200),
          ctx.json({ id: 1, email: 'test@example.com' })
        );
      }),
      rest.get(`${API_BASE_URL}/conversations`, (_req: any, res: any, ctx: any) => {
        return res(
          ctx.status(200),
          ctx.json([
            { id: 1, title: 'Чат 1', created_at: new Date().toISOString(), messages: [] },
            { id: 2, title: 'Чат 2', created_at: new Date().toISOString(), messages: [] },
          ])
        );
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

    // New chat button is visible
    expect(screen.getByRole('button', { name: /Новый чат/i })).toBeInTheDocument();
  });

  it('creates a new conversation', async () => {
    // Mock create conversation
    server.use(
      rest.post(`${API_BASE_URL}/conversations`, async (_req: any, res: any, ctx: any) => {
        return res(
          ctx.status(200),
          ctx.json({ id: 3, title: 'Новый чат', created_at: new Date().toISOString(), messages: [] })
        );
      })
    );

    render(<DashboardPage />);

    const newChatButton = await screen.findByRole('button', { name: /Новый чат/i });
    fireEvent.click(newChatButton);

    await waitFor(() => {
      expect(screen.getByText('Новый чат')).toBeInTheDocument();
    });
  });
});
