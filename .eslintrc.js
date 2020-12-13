module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    project: './tsconfig.eslint.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jsx-a11y',
    'react',
    'react-hooks',
  ],
  root: true,
  rules: {
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    // should be rewritten as `['error', { allowAsStatement: true }]` in ESLint 7 or later
    // SEE: https://github.com/typescript-eslint/typescript-eslint/issues/1184
    'no-void': 'off',
    // 'padding-line-between-statements': [
    //   'error',
    //   {
    //     blankLine: 'always',
    //     prev: '*',
    //     next: 'return',
    //   },
    // ],
    // '@typescript-eslint/no-unused-vars': [
    //   'error',
    //   {
    //     vars: 'all',
    //     args: 'after-used',
    //     argsIgnorePattern: '_',
    //     ignoreRestSiblings: false,
    //     varsIgnorePattern: '_',
    //   },
    // ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'enforce',
        custom: 'enforce',
        explicitSpread: 'ignore',
      },
    ],
    'react/jsx-one-expression-per-line': 0,
    //   https://stackoverflow.com/a/64024916/4860874
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'max-len': 'off',
    'padding-line-between-statements': 'off',
    'arrow-body-style': 'off',
    // https://github.com/immerjs/immer/issues/189
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    '@typescript-eslint/no-unused-vars': 'warn',
    'jsx-a11y/label-has-associated-control': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    'jsx-a11y/label-has-for': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
