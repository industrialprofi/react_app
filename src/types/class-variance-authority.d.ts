declare module 'class-variance-authority' {
  export type VariantProps<T extends (...args: any) => any> = Omit<
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
    [key: string]: any;
  }) => string;
}
