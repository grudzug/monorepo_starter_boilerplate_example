import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'

import { baseConfig } from './base.js'

/**
 * ESLint config for React apps (Vite + TypeScript).
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const reactConfig = [
  ...baseConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
      // Vite built-in import.meta.env keys (not VITE_* prefixed)
      'turbo/no-undeclared-env-vars': [
        'warn',
        {
          allowList: ['^BASE_URL$', '^DEV$', '^MODE$', '^PROD$', '^SSR$'],
        },
      ],
    },
  },
]

export default reactConfig
