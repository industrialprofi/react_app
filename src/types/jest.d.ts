/// <reference types="@testing-library/jest-dom" />

// Add any custom matchers here if needed
declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveClass(...classNames: string[]): R;
    toHaveAttribute(attr: string, value?: string): R;
    // Add other custom matchers as needed
  }
}
