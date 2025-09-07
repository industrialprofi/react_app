import React, { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  // Keep API compatible, but unused now
  router?: Record<string, unknown>;
};

export function AppRouterContextProviderMock({ children }: Props): React.ReactNode {
  // We rely on global jest.setup.js mocks for next/navigation.
  // This component is now a simple pass-through to avoid importing Next internals.
  return <>{children}</>;
}
