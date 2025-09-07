import { render, screen, fireEvent, waitFor } from '@/test-utils';
import { DocumentEditor } from '../DocumentEditor';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { rest } from 'msw';
import { API_BASE_URL } from '@/__tests__/test-utils/mock-config';

// Mock next/navigation
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockPrefetch = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: mockPrefetch,
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/editor/1',
}));

describe('DocumentEditor', () => {
  const mockDocument = {
    id: '1',
    title: 'Test Document',
    content: 'Initial content',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock successful document fetch
    server.use(
      http.get(`${API_BASE_URL}/documents/1`, () => {
        return HttpResponse.json(mockDocument, { status: 200 });
      })
    );
  });

  it('renders the document editor with initial content', async () => {
    render(<DocumentEditor documentId="1" />);
    
    // Check if loading state is shown initially
    expect(screen.getByText(/Загрузка.../i)).toBeInTheDocument();
    
    // Wait for document to load
    const editor = await screen.findByRole('textbox');
    
    // Check if editor contains the initial content
    expect(editor).toHaveValue(mockDocument.content);
    
    // Check if title is displayed
    expect(screen.getByDisplayValue(mockDocument.title)).toBeInTheDocument();
  });

  it('allows editing the document title and content', async () => {
    render(<DocumentEditor documentId="1" />);
    
    // Wait for document to load
    const editor = await screen.findByRole('textbox');
    const titleInput = screen.getByLabelText(/Название документа/i);
    
    // Edit title
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    expect(titleInput).toHaveValue('Updated Title');
    
    // Edit content
    fireEvent.change(editor, { target: { value: 'Updated content' } });
    expect(editor).toHaveValue('Updated content');
  });

  it('saves document changes', async () => {
    // Mock successful save
    const saveHandler = jest.fn((req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          ...mockDocument,
          title: 'Updated Title',
          content: 'Updated content',
          updated_at: new Date().toISOString(),
        })
      );
    });
    
    server.use(
      rest.patch(`${API_BASE_URL}/documents/1`, saveHandler)
    );
    
    render(<DocumentEditor documentId="1" />);
    
    // Wait for document to load
    const editor = await screen.findByRole('textbox');
    const titleInput = screen.getByLabelText(/Название документа/i);
    const saveButton = screen.getByRole('button', { name: /Сохранить/i });
    
    // Make changes
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(editor, { target: { value: 'Updated content' } });
    
    // Save changes
    fireEvent.click(saveButton);
    
    // Check if save was called with correct data
    await waitFor(() => {
      expect(saveHandler).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything()
      );
      
      // Check if success message is shown
      expect(screen.getByText(/Документ сохранен/i)).toBeInTheDocument();
    });
  });

  it('shows error when document fails to load', async () => {
    // Mock failed document fetch
    server.use(
      rest.get(`${API_BASE_URL}/documents/1`, (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({ detail: 'Document not found' })
        );
      })
    );
    
    render(<DocumentEditor documentId="1" />);
    
    // Check if error message is shown
    const errorMessage = await screen.findByText(/Ошибка при загрузке документа/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('shows error when save fails', async () => {
    // Mock failed save
    server.use(
      rest.patch(`${API_BASE_URL}/documents/1`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ detail: 'Failed to save document' })
        );
      })
    );
    
    render(<DocumentEditor documentId="1" />);
    
    // Wait for document to load
    const editor = await screen.findByRole('textbox');
    const saveButton = screen.getByRole('button', { name: /Сохранить/i });
    
    // Make a change
    fireEvent.change(editor, { target: { value: 'Updated content' } });
    
    // Save changes
    fireEvent.click(saveButton);
    
    // Check if error message is shown
    const errorMessage = await screen.findByText(/Ошибка при сохранении документа/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('shows a confirmation dialog when there are unsaved changes', async () => {
    // Mock window.confirm
    const originalConfirm = window.confirm;
    window.confirm = jest.fn(() => true);
    
    // Mock navigation
    const mockPush = jest.fn();
    jest.mock('next/navigation', () => ({
      useRouter: () => ({
        push: mockPush,
      }),
      useSearchParams: () => new URLSearchParams(),
      usePathname: () => '/editor/1',
    }));
    
    render(<DocumentEditor documentId="1" />);
    
    // Wait for document to load
    const editor = await screen.findByRole('textbox');
    const homeLink = screen.getByRole('link', { name: /На главную/i });
    
    // Make a change
    fireEvent.change(editor, { target: { value: 'Updated content' } });
    
    // Try to navigate away
    fireEvent.click(homeLink);
    
    // Check if confirmation dialog was shown
    expect(window.confirm).toHaveBeenCalledWith(
      'У вас есть несохраненные изменения. Вы уверены, что хотите уйти?'
    );
    
    // Clean up
    window.confirm = originalConfirm;
  });
});
