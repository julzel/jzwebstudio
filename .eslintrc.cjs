module.exports = {
  root: true,

  env: {
    browser: true,
    es2022: true,
    node: true
  },

  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: true,
      node: true
    }
  },

  ignorePatterns: [
    'dist',
    'node_modules',
    'tests/e2e',
    'playwright.config.ts',
    'postcss.config.js',
    'tailwind.config.ts',
    'vite.config.ts',
    'vitest.config.ts',
    'vitest.setup.ts',
    'vitest.shims.d.ts',
    'storybook-static'
  ],

  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'import'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier'
      ],
      rules: {
        'react/prop-types': 'off',
        '@typescript-eslint/consistent-type-imports': 'error',
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            'newlines-between': 'always'
          }
        ]
      }
    },
    {
      files: ['**/*.test.{ts,tsx}'],
      rules: {
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off'
      }
    },
    {
      files: ['**/*.js'],
      extends: ['eslint:recommended', 'prettier']
    }
  ],

  extends: ['plugin:storybook/recommended']
};
