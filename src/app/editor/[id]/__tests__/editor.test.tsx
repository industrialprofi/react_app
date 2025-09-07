import { render, screen, waitFor, fireEvent } from '@/test-utils';
import EditorPage from '../page';
import { server } from '@/mocks/server';
import { rest } from 'msw';
import { API_BASE_URL } from '@/__tests__/test-utils/mock-config';

type MockRequest = {
  body: any;
  params: {
    id: string;
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

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

// Mock next/navigation useParams
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
    return '/editor/1';
  },
  useParams() {
    return { id: '1' };
  },
}));

describe('Editor Page', () => {
  it('loads and displays the document', async () => {
    // Mock the document data
    server.use(
      rest.get(`${API_BASE_URL}/documents/1`, (req: MockRequest, res: any, ctx: any) => {
        return res(
          ctx.status(200),
          ctx.json({
            id: '1',
            title: 'Документ 1',
            content: 'Содержимое документа 1',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
        );
      })
    );

    render(<EditorPage params={{ id: '1' }} />);
    
    // Check if loading state is shown
    expect(screen.getByText(/Загрузка.../i)).toBeInTheDocument();
    
    // Wait for the document to load
    const title = await screen.findByText(/Документ 1/i);
    const content = await screen.findByText(/Содержимое документа 1/i);
    
    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('allows editing the document', async () => {
    // Mock the initial document load
    server.use(
      rest.get(`${API_BASE_URL}/documents/1`, (req: MockRequest, res: any, ctx: any) => {
        return res(
          ctx.status(200),
          ctx.json({
            id: '1',
            title: 'Документ 1',
            content: 'Содержимое документа 1',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
        );
      })
    );

    render(<EditorPage params={{ id: '1' }} />);
    
    // Wait for the document to load
    const editor = await screen.findByRole('textbox') as HTMLTextAreaElement;
    
    // Simulate typing in the editor
    fireEvent.change(editor, { 
      target: { 
        value: 'Новое содержимое документа' 
      } 
    });
    
    // Check if the save button is enabled
    const saveButton = screen.getByRole('button', { name: /Сохранить/i });
    expect(saveButton).not.toBeDisabled();
    
    // Mock the save API call
    server.use(
      rest.patch(`${API_BASE_URL}/documents/1`, (req: MockRequest, res: any, ctx: any) => {
        return res(
          ctx.status(200),
          ctx.json({
            id: '1',
            title: 'Документ 1',
            content: 'Новое содержимое документа',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
        );
      })
    );
    
    // Click the save button
    fireEvent.click(saveButton);
    
    // Check if the success message is shown
    const successMessage = await screen.findByText(/Документ сохранен/i);
    expect(successMessage).toBeInTheDocument();
  });

  it('shows an error when document fails to load', async () => {
    // Override the default handler for this test
    server.use(
      rest.get(`${API_BASE_URL}/documents/1`, (req: MockRequest, res: any, ctx: any) => {
        return res(
          ctx.status(404),
          ctx.json({
            detail: 'Document not found',
          })
        );
      })
    );
    
    render(<EditorPage params={{ id: '1' }} />);
    
    // Check if the error message is shown
    const errorMessage = await screen.findByText(/Ошибка при загрузке документа/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
