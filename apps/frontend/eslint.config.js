import reactConfig from '@repo/eslint-config/react'
import reactRefresh from 'eslint-plugin-react-refresh'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...reactConfig,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'eslint.config.js', '**/*.md'],
  },
  {
    files: ['src/features/shared/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
]
