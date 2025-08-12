declare module 'class-variance-authority' {
  // Использование unknown вместо any для типобезопасности
  export type VariantProps<T extends (...args: unknown[]) => unknown> = Omit<
    Parameters<T>[0],
    'className' | 'style'
  >;
  
  export function cva(
    base?: string,
    config?: {
      variants?: Record<string, Record<string, string>>;
      compoundVariants?: {
        [key: string]: string | boolean | undefined;
        className: string;
      }[];
      defaultVariants?: {
        [key: string]: string | boolean | undefined;
      };
    }
  ): (props?: {
    className?: string;
    [key: string]: unknown; // Использование unknown вместо any
  }) => string;
}
