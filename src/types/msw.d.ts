// Type definitions for MSW
import { SetupServerApi } from 'msw/node';

declare module 'msw' {
  export const rest: {
    get: (path: string, handler: any) => any;
    post: (path: string, handler: any) => any;
    put: (path: string, handler: any) => any;
    delete: (path: string, handler: any) => any;
    patch: (path: string, handler: any) => any;
  };
  
  export function setupServer(...handlers: any[]): SetupServerApi;
}
