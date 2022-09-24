const path = require('path');

const ERROR = 'error';
const WARNING = 'warn';
const OFF = 'off';

const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');

/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  root: true,
  overrides: [
    {
      files: ['**/*.js'],
      env: {
        es6: true,
        node: true,
      },
      parserOptions: {
        ecmaVersion: 12,
      },
      extends: ['eslint:recommended', 'prettier'],
    },
    {
      files: ['**/*.{ts,tsx}'],
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: tsconfigPath,
        warnOnUnsupportedTypeScriptVersion: true,
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': [['.ts', '.tsx', '.d.ts']],
        },
        'import/docstyle': ['jsdoc', 'tomdoc'],
        'import/resolver': {
          typescript: {
            project: tsconfigPath,
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'airbnb-typescript',
        'plugin:react-hooks/recommended',
        'plugin:@next/next/recommended',
        'prettier',
      ],
      plugins: ['import', 'simple-import-sort'],
      rules: {
        // core web vital
        // https://github.com/vercel/next.js/blob/v12.1.5/packages/eslint-plugin-next/lib/index.js#L53
        '@next/next/no-sync-scripts': ERROR,
        '@next/next/no-html-link-for-pages': [ERROR, './src/pages/'],
        // updateしてなぜかこれがあるとエラーになった
        // '@next/next/link-passhref': ERROR,
        'react/function-component-definition': [
          ERROR,
          {namedComponents: 'arrow-function', unnamedComponents: 'arrow-function'},
        ],
        'react/no-unstable-nested-components': [ERROR, {allowAsProps: true}],
        'react/jsx-handler-names': [ERROR],
        'react/jsx-no-useless-fragment': [ERROR, {allowExpressions: true}],
        'react/jsx-sort-props': [ERROR, {reservedFirst: true, callbacksLast: true}],
        'react/jsx-props-no-spreading': [ERROR, {custom: 'ignore'}],
        'react/jsx-no-bind': OFF,
        'react/react-in-jsx-scope': OFF,
        'react/require-default-props': OFF,
        'react/prop-types': OFF,

        // ==================
        // typescript
        // ==================
        '@typescript-eslint/array-type': [
          ERROR,
          {
            default: 'array-simple',
            readonly: 'array-simple',
          },
        ],
        // ban enum
        'no-restricted-syntax': [
          ERROR,
          {
            selector: 'TSEnumDeclaration',
            message: "Don't declare enums",
          },
        ],
        '@typescript-eslint/consistent-type-imports': ERROR,
        '@typescript-eslint/explicit-member-accessibility': [
          ERROR,
          {
            accessibility: 'explicit',
            overrides: {constructors: 'no-public'},
          },
        ],
        '@typescript-eslint/method-signature-style': [ERROR, 'property'],
        // conflict airbnb style
        // naming convention
        'no-underscore-dangle': OFF,
        '@typescript-eslint/naming-convention': [
          ERROR,
          // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/91fd090f6fdd8d598a6ac6e9bb2c2ba33014e425/lib/shared.js#L41
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          },
          {
            selector: 'function',
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          // my style
          {
            selector: 'parameter',
            // HOCのようにReact Componentを指定する可能性があるのでPascalCaseもいれる
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'memberLike',
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
            modifiers: ['public'],
          },
          {
            selector: 'memberLike',
            format: ['camelCase'],
            leadingUnderscore: 'allowDouble',
            trailingUnderscore: 'forbid',
            modifiers: ['private', 'protected'],
          },
          {
            selector: 'property',
            format: ['camelCase', 'PascalCase'],
          },
        ],

        // ==================
        // import
        // ==================
        // no default export
        'import/prefer-default-export': OFF,
        'import/no-default-export': ERROR,
        'import/no-deprecated': WARNING,
        // sort
        'import/first': ERROR,
        'import/newline-after-import': ERROR,
        'import/no-duplicates': ERROR,
        'import/order': OFF,
        'simple-import-sort/exports': ERROR,
        'simple-import-sort/imports': [
          ERROR,
          {
            groups: [
              // Packages. `react` related packages come first.
              ['^react$', '^next(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // node_modules library
              ['^@?\\w', '^'],
              // src absolute path
              ['^~(/.*|$)'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ],
          },
        ],
        'import/no-extraneous-dependencies': [
          ERROR,
          {
            devDependencies: [
              '**/test-helper/**/*',
              '**/*.test.ts',
              '**/*.test.tsx',
              '**/*.stories.tsx',
              '**/*.story.tsx',
              '**/test-helpers/**',
              '**/*.factory.ts',
              '**/*.factory.tsx',
            ],
          },
        ],
      },
      overrides: [
        {
          files: ['src/pages/**/*.{ts,tsx}'],
          plugins: ['import'],
          rules: {
            'import/prefer-default-export': ERROR,
            'import/no-default-export': OFF,
          },
        },
      ],
    },
  ],
};
