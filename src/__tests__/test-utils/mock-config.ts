// Test configuration that can be mocked in tests
export const API_BASE_URL = 'http://localhost:8000';

export const TEST_USER = {
  id: 1,
  email: 'test@example.com',
  is_active: true,
  is_superuser: false,
  created_at: new Date().toISOString(),
};
