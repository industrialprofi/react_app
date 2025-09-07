import { rest } from 'msw';
import config from '@/lib/config';

export const handlers = [
  // Auth
  rest.post(`${config.API_BASE_URL}/auth/login`, async (req, res, ctx) => {
    const { email, password } = await req.json();

    if (email === 'test@example.com' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({
          access_token: 'test-jwt-token',
          token_type: 'bearer',
          user: {
            id: 1,
            email: 'test@example.com',
            is_active: true,
            is_superuser: false,
          },
        })
      );
    }

    return res(
      ctx.status(401),
      ctx.json({ detail: 'Incorrect email or password' })
    );
  }),

  // Get current user
  rest.get(`${config.API_BASE_URL}/users/me`, (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');

    if (authHeader === 'Bearer test-jwt-token') {
      return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          email: 'test@example.com',
          is_active: true,
          is_superuser: false,
          created_at: new Date().toISOString(),
        })
      );
    }

    return res(
      ctx.status(401),
      ctx.json({ detail: 'Not authenticated' })
    );
  }),

  // Get user documents
  rest.get(`${config.API_BASE_URL}/documents`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: '1',
          title: 'Документ 1',
          content: 'Содержимое документа 1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Документ 2',
          content: 'Содержимое документа 2',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
    );
  }),
];
