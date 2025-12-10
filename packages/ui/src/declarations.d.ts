/// <reference types="react" />
/// <reference types="react-dom" />

// JSON module typings
declare module '*.json' {
  const value: unknown;
  export default value;
}

declare global {
  namespace JSX {
    interface Element extends React.ReactElement {}
    interface IntrinsicElements {
      [elemName: string]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export {};
