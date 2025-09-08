import { http, HttpResponse } from 'msw';
import config from '@/lib/config';

const API_BASE_URL = process.env.NODE_ENV === 'test' ? 'http://localhost:8000' : config.API_BASE_URL;

export const handlers = [
  // Auth
  http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
    const body = await request.json() as { email: string; password: string };
    const { email, password } = body;

    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json({
        access_token: 'test-jwt-token',
        token_type: 'bearer',
        user: {
          id: 1,
          email: 'test@example.com',
          is_active: true,
          is_superuser: false,
        },
      });
    }

    return HttpResponse.json(
      { detail: 'Incorrect email or password' },
      { status: 401 }
    );
  }),

  // Get current user
  http.get(`${API_BASE_URL}/auth/me`, ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (authHeader === 'Bearer test-jwt-token') {
      return HttpResponse.json({
        id: 1,
        email: 'test@example.com',
        is_active: true,
        is_superuser: false,
        created_at: new Date().toISOString(),
      });
    }

    return HttpResponse.json(
      { detail: 'Not authenticated' },
      { status: 401 }
    );
  }),

  // Alternative user endpoint
  http.get(`${API_BASE_URL}/users/me`, ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (authHeader === 'Bearer test-jwt-token') {
      return HttpResponse.json({
        id: 1,
        email: 'test@example.com',
        is_active: true,
        is_superuser: false,
        created_at: new Date().toISOString(),
      });
    }

    return HttpResponse.json(
      { detail: 'Not authenticated' },
      { status: 401 }
    );
  }),

  // Get conversations
  http.get(`${API_BASE_URL}/conversations`, () => {
    return HttpResponse.json([
      {
        id: '1',
        title: 'Разговор 1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Разговор 2',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  }),

  // Chat endpoint
  http.post(`${API_BASE_URL}/chat`, async ({ request }) => {
    const body = await request.json() as { message: string };
    const { message } = body;
    
    return HttpResponse.json({
      response: `Тестовый ответ на: ${message}`,
      conversation_id: '1',
    });
  }),

  // Get subscription plans
  http.get(`${API_BASE_URL}/subscriptions/plans`, () => {
    return HttpResponse.json([
      {
        id: 'basic',
        name: 'Базовый',
        price: 990,
        features: ['100 запросов в день', 'Базовая поддержка'],
      },
      {
        id: 'pro',
        name: 'Профессиональный',
        price: 1990,
        features: ['1000 запросов в день', 'Приоритетная поддержка'],
      },
    ]);
  }),
];
