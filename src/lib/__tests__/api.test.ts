import { API_BASE_URL } from '@/__tests__/test-utils/mock-config';
import { api, setAuthToken, clearAuthToken } from '../api';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch as jest.Mock;

describe('API Client', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Clear any stored tokens
    clearAuthToken();
  });

  it('makes a GET request without authentication', async () => {
    const mockData = { id: 1, name: 'Test' };
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const response = await api.get('/test');
    
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/test`,
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
    
    expect(response).toEqual(mockData);
  });

  it('includes auth token in headers when set', async () => {
    const testToken = 'test-token';
    setAuthToken(testToken);
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await api.get('/protected');
    
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': `Bearer ${testToken}`,
        }),
      })
    );
  });

  it('handles POST request with data', async () => {
    const requestData = { name: 'Test' };
    const responseData = { id: 1, ...requestData };
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => responseData,
    });

    const response = await api.post('/items', requestData);
    
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/items`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(requestData),
      })
    );
    
    expect(response).toEqual(responseData);
  });

  it('handles PATCH request', async () => {
    const updateData = { name: 'Updated' };
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await api.patch('/items/1', updateData);
    
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/items/1`,
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify(updateData),
      })
    );
  });

  it('handles DELETE request', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await api.delete('/items/1');
    
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/items/1`,
      expect.objectContaining({
        method: 'DELETE',
      })
    );
  });

  it('throws an error for non-OK responses', async () => {
    const errorMessage = 'Not found';
    
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ detail: errorMessage }),
    });

    await expect(api.get('/nonexistent')).rejects.toThrow(errorMessage);
  });

  it('handles network errors', async () => {
    const error = new Error('Network error');
    mockFetch.mockRejectedValueOnce(error);

    await expect(api.get('/test')).rejects.toThrow('Network error');
  });

  it('handles non-JSON responses', async () => {
    const textResponse = 'Plain text response';
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => { throw new Error('Not JSON'); },
      text: async () => textResponse,
      headers: new Headers({ 'Content-Type': 'text/plain' }),
    });

    const response = await api.get('/text-response');
    expect(response).toBe(textResponse);
  });

  it('clears auth token on 401 response', async () => {
    // Set a token first
    const testToken = 'test-token';
    setAuthToken(testToken);
    
    // Mock 401 response
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ detail: 'Unauthorized' }),
    });

    // Spy on clearAuthToken
    const clearSpy = jest.spyOn(Storage.prototype, 'removeItem');
    
    await expect(api.get('/protected')).rejects.toThrow('Unauthorized');
    
    // Check if clearAuthToken was called
    expect(clearSpy).toHaveBeenCalledWith('auth_token');
    
    // Clean up
    clearSpy.mockRestore();
  });
});
