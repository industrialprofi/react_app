// Polyfill fetch/Request/Response for MSW and browser-like APIs
import 'whatwg-fetch';

// Import the jest-dom library for custom matchers
import '@testing-library/jest-dom';

// Polyfill BroadcastChannel for MSW v2
class BroadcastChannelPolyfill {
  constructor(name) {
    this.name = name;
  }
  postMessage() {}
  addEventListener() {}
  removeEventListener() {}
  close() {}
}

// @ts-ignore
if (!global.BroadcastChannel) {
  // @ts-ignore
  global.BroadcastChannel = BroadcastChannelPolyfill;
}

// Polyfill TextEncoder/TextDecoder for Node
import { TextEncoder, TextDecoder } from 'util';
import { TransformStream, ReadableStream, WritableStream } from 'stream/web';
// @ts-ignore
if (!global.TextEncoder) {
  // @ts-ignore
  global.TextEncoder = TextEncoder;
}
// @ts-ignore
if (!global.TextDecoder) {
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}

// Polyfill Web Streams (Node < 18 compatibility for some libs)
// @ts-ignore
if (!global.TransformStream) {
  // @ts-ignore
  global.TransformStream = TransformStream;
}
// @ts-ignore
if (!global.ReadableStream) {
  // @ts-ignore
  global.ReadableStream = ReadableStream;
}
// @ts-ignore
if (!global.WritableStream) {
  // @ts-ignore
  global.WritableStream = WritableStream;
}

// Mock next/navigation with a stable singleton router for assertions
const __mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
};
// expose for tests
// @ts-ignore
globalThis.__mockRouter = __mockRouter;

jest.mock('next/navigation', () => ({
  useRouter: () => globalThis.__mockRouter,
  useParams: () => ({ id: 'test-id' }),
  useSearchParams: () => {
    return new URLSearchParams();
  },
  usePathname: () => {
    return '/';
  },
}));

// Mock next-auth/react
jest.mock(
  'next-auth/react',
  () => ({
    useSession: jest.fn(() => ({
      data: null,
      status: 'unauthenticated',
    })),
    signIn: jest.fn(),
    signOut: jest.fn(),
  }),
  { virtual: true }
);

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock window.scrollTo
window.scrollTo = jest.fn();

// Mock next/head
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <>{children}</>;
    },
  };
});

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...rest }) => {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  };
});

// Mock next/image
jest.mock('next/image', () => {
  return function Image({ src, alt, width, height }) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        data-testid="mock-image"
      />
    );
  };
});
