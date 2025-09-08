// Test configuration that can be mocked in tests
export const API_BASE_URL = 'http://localhost:8000';

export const TEST_USER = {
  id: 1,
  email: 'test@example.com',
  is_active: true,
  is_superuser: false,
  created_at: new Date().toISOString(),
};

// Simple test to prevent "no tests" error
describe('Mock Config', () => {
  it('exports API_BASE_URL', () => {
    expect(API_BASE_URL).toBe('http://localhost:8000');
  });
});
