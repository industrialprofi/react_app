import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AppRouterContextProviderMock } from './test-utils/app-router-context-provider-mock';
import { ThemeProvider } from 'next-themes';

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

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: null,
    status: 'unauthenticated',
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  router?: Partial<React.ComponentProps<typeof AppRouterContextProviderMock>>;
};

const customRender = (
  ui: ReactElement,
  { router, ...options }: CustomRenderOptions = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AppRouterContextProviderMock {...router}>
        {children}
      </AppRouterContextProviderMock>
    </ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
