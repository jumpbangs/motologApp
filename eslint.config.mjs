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
      'react-native': pluginReactNative,
      prettier: pluginPrettier,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      react: {
        version: 'detect',
        jsxRuntime: 'automatic',
      },
    },
    rules: {
      // Enforce Prettier formatting as ESLint errors
      'prettier/prettier': 'error',

      // ESLint rules
      'no-duplicate-imports': 'error',
      'no-console': 'error',
      'no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],

      // React recommended rules
      ...pluginReact.configs.recommended.rules,

      // Prettier recommended rules
      ...pluginPrettier.configs.recommended.rules,

      // Disable ESLint rules that conflict with Prettier
      ...prettier.rules,

      // simple-import-sort rules
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^preact', '^@?\\w'],
            ['^expo', '^@expo'],
            ['^@rneui'],
            ['^firebase'],
            ['^(components|theme|store|services|screens|features|common|utils|routes|types|styles)(/.*|$)'],
            ['^()(/.*|$)'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.?(css)$'],
          ],
        },
      ],

      // Turn off rules conflicting with simple-import-sort
      'import/order': 'off',
      'sort-imports': 'off',
    },
  },
];
