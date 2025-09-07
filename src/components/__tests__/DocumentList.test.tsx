import { render, screen, fireEvent, waitFor } from '@/test-utils';
import { DocumentList } from '../DocumentList';
import { server } from '@/mocks/server';
import { API_BASE_URL } from '@/__tests__/test-utils/mock-config';
import { rest } from 'msw';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/documents',
}));

const mockDocuments = [
  {
    id: '1',
    title: 'First Document',
    content: 'Content 1',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Second Document',
    content: 'Content 2',
    created_at: '2023-01-02T00:00:00Z',
    updated_at: '2023-01-02T00:00:00Z',
  },
];

describe('DocumentList', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock successful documents fetch
    server.use(
      rest.get(`${API_BASE_URL}/documents`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(mockDocuments)
        );
      })
    );
  });

  it('displays a list of documents', async () => {
    render(<DocumentList />);
    
    // Check if loading state is shown initially
    expect(screen.getByText(/Загрузка документов.../i)).toBeInTheDocument();
    
    // Wait for documents to load
    const documentItems = await screen.findAllByRole('listitem');
    
    // Check if all documents are displayed
    expect(documentItems).toHaveLength(mockDocuments.length);
    
    // Check if document titles are displayed
    expect(screen.getByText('First Document')).toBeInTheDocument();
    expect(screen.getByText('Second Document')).toBeInTheDocument();
  });

  it('allows creating a new document', async () => {
    const newDocument = {
      id: '3',
      title: 'New Document',
      content: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // Mock successful document creation
    server.use(
      rest.post(`${API_BASE_URL}/documents`, (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json(newDocument)
        );
      })
    );
    
    render(<DocumentList />);
    
    // Click create button
    const createButton = await screen.findByRole('button', { name: /Создать документ/i });
    fireEvent.click(createButton);
    
    // Check if the new document appears in the list
    const newDocumentItem = await screen.findByText('New Document');
    expect(newDocumentItem).toBeInTheDocument();
  });

  it('allows deleting a document', async () => {
    // Mock successful deletion
    const deleteHandler = jest.fn((req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ success: true })
      );
    });
    
    server.use(
      rest.delete(`${API_BASE_URL}/documents/1`, deleteHandler)
    );
    
    render(<DocumentList />);
    
    // Wait for documents to load
    await screen.findByText('First Document');
    
    // Click delete button on the first document
    const deleteButtons = await screen.findAllByRole('button', { name: /Удалить/i });
    fireEvent.click(deleteButtons[0]);
    
    // Confirm deletion
    const confirmButton = await screen.findByRole('button', { name: /Подтвердить/i });
    fireEvent.click(confirmButton);
    
    // Check if delete was called
    await waitFor(() => {
      expect(deleteHandler).toHaveBeenCalled();
    });
    
    // Check if the document is removed from the list
    await waitFor(() => {
      expect(screen.queryByText('First Document')).not.toBeInTheDocument();
    });
  });

  it('allows searching documents', async () => {
    render(<DocumentList />);
    
    // Wait for documents to load
    await screen.findByText('First Document');
    
    // Type in search input
    const searchInput = screen.getByPlaceholderText(/Поиск документов.../i);
    fireEvent.change(searchInput, { target: { value: 'Second' } });
    
    // Check if only matching document is shown
    expect(screen.queryByText('First Document')).not.toBeInTheDocument();
    expect(screen.getByText('Second Document')).toBeInTheDocument();
    
    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });
    
    // Check if all documents are shown again
    expect(screen.getByText('First Document')).toBeInTheDocument();
    expect(screen.getByText('Second Document')).toBeInTheDocument();
  });

  it('shows an error when documents fail to load', async () => {
    // Mock failed documents fetch
    server.use(
      rest.get(`${API_BASE_URL}/documents`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ detail: 'Internal server error' })
        );
      })
    );
    
    render(<DocumentList />);
    
    // Check if error message is shown
    const errorMessage = await screen.findByText(/Ошибка при загрузке документов/i);
    expect(errorMessage).toBeInTheDocument();
    
    // Check if retry button is shown
    const retryButton = screen.getByRole('button', { name: /Повторить/i });
    expect(retryButton).toBeInTheDocument();
    
    // Mock successful retry
    server.use(
      rest.get(`${API_BASE_URL}/documents`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(mockDocuments)
        );
      })
    );
    
    // Click retry button
    fireEvent.click(retryButton);
    
    // Check if documents are loaded after retry
    const documentItems = await screen.findAllByRole('listitem');
    expect(documentItems).toHaveLength(mockDocuments.length);
  });

  it('allows sorting documents by date', async () => {
    render(<DocumentList />);
    
    // Wait for documents to load
    await screen.findByText('First Document');
    
    // Get document items
    const documentItems = screen.getAllByRole('listitem');
    
    // Check initial order (newest first)
    expect(documentItems[0]).toHaveTextContent('Second Document');
    expect(documentItems[1]).toHaveTextContent('First Document');
    
    // Change sort order
    const sortSelect = screen.getByLabelText(/Сортировка/i);
    fireEvent.change(sortSelect, { target: { value: 'oldest' } });
    
    // Get reordered document items
    const reorderedItems = screen.getAllByRole('listitem');
    
    // Check new order (oldest first)
    expect(reorderedItems[0]).toHaveTextContent('First Document');
    expect(reorderedItems[1]).toHaveTextContent('Second Document');
  });
});
