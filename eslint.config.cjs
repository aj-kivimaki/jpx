module.exports = [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/coverage/**',
      'packages/**/coverage/**',
      'apps/**/coverage/**',
      '**/*.d.ts',
    ],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.base.json'],
      },
      globals: { React: 'readonly' },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      'jsx-a11y': require('eslint-plugin-jsx-a11y'),
      'simple-import-sort': require('eslint-plugin-simple-import-sort'),
    },
    rules: {
      ...require('@typescript-eslint/eslint-plugin').configs.recommended.rules,
      ...require('eslint-plugin-react-hooks').configs.recommended.rules,
      ...require('eslint-plugin-jsx-a11y').configs.recommended.rules,
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages: react, next, node_modules
            [String.raw`^\u0000`, '^react', String.raw`^@?\w`],

            // Internal packages / aliases
            ['^(@|components|utils|config)(/.*|$)'],

            // Parent imports
            [String.raw`^\.\.(?!/?$)`, String.raw`^\.\./?$`],

            // Other relative imports
            [
              String.raw`^\./(?=.*/)(?!/?$)`,
              String.raw`^\.(?!/?$)`,
              String.raw`^\./?$`,
            ],

            // Side effect imports
            [String.raw`^\u0000`],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  // Tests: allow `any` usage in test files for concise mocks and fakes
  {
    files: [
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/__tests__/**',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
