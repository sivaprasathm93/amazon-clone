import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

// Frontend-only config: it assumes browser globals and React. The backend is a
// separate package with its own tsconfig and Node globals, so it is excluded.
export default tseslint.config(
  { ignores: ['dist', 'server'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // v7 still exposes the eslintrc-shaped configs at the top level; the
  // flat-config versions live under `configs.flat`.
  reactHooks.configs.flat['recommended-latest'],
  reactRefresh.configs.vite,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    rules: {
      // Kept as a warning, as it was before the ESLint 10 upgrade: CartContext
      // intentionally exports the useCart hook alongside its provider.
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);
