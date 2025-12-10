/// <reference types="react" />
/// <reference types="react-dom" />

// JSON module typings
declare module '*.json' {
  const value: any;
  export default value;
}

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
