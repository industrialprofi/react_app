import React, { type ReactNode, useMemo } from 'react';
import {
  AppRouterContext,
  type AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context';

interface AppRouterContextProviderMockProps {
  router?: Partial<AppRouterInstance>;
  children: ReactNode;
}

export function AppRouterContextProviderMock({
  router,
  children,
}: AppRouterContextProviderMockProps): React.ReactNode {
  const mockedRouter: AppRouterInstance = useMemo(
    () => ({
      back: jest.fn(),
      forward: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
      ...router,
    }),
    [router]
  );

  return (
    <AppRouterContext.Provider value={mockedRouter}>
      {children}
    </AppRouterContext.Provider>
  );
}
