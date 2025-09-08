import { render, screen, waitFor, fireEvent } from '@/test-utils';
import EditorPage from '../page';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '@/__tests__/test-utils/mock-config';

// Enable API mocking before tests
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

// Access the global mock router
declare global {
  var __mockRouter: {
    push: jest.Mock;
    replace: jest.Mock;
    prefetch: jest.Mock;
  };
}

describe('Editor Page', () => {
  it('has EditorPage component', () => {
    // Just check that the component exists
    expect(EditorPage).toBeDefined();
    expect(typeof EditorPage).toBe('function');
  });

});
