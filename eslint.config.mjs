import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactNative from 'eslint-plugin-react-native';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
      'react-native': pluginReactNative,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      react: {
        version: 'detect',
        jsxRuntime: 'automatic',
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'no-duplicate-imports': 'error',
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
      // React recommended rules
      ...pluginReact.configs.recommended.rules,

      // Prettier plugin recommended rules (adds `prettier/prettier`: "error")
      ...pluginPrettier.configs.recommended.rules,

      // Disables ESLint rules that conflict with Prettier
      ...prettier.rules,

      // simple-import-sort rules
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^preact', '^@?\\w'],
            // Expo Packages
            ['^expo', '^@expo'],
            // React native element packages
            ['^@rneui'],
            // Internal packages.
            ['^(components|theme|store|services|pages|features|common|utils|routes|types)(/.*|$)'],
            ['^()(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css)$'],
          ],
        },
      ],
      'import/order': 'off',
      'sort-imports': 'off',
    },
  },
];
