/// <reference types="react" />
/// <reference types="react-dom" />

// CSS/SCSS module typings
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// JSON module typings
declare module '*.json' {
  const value: any;
  export default value;
}

// Minimal global JSX namespace (for libraries like react-icons)
declare namespace JSX {
  interface Element extends React.ReactElement<any, any> {}
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
