// eslint.config.cjs
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react-hooks', 'react-refresh', '@typescript-eslint', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  ignorePatterns: ['dist/', 'node_modules/'],
  overrides: [
    {
      files: [
        'packages/frontend/**/*.{ts,tsx}',
        'packages/admin-panel/**/*.{ts,tsx}',
      ],
    },
  ],
};
