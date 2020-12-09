module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    'jest/globals': true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'jest'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
  rules: {
    // switch 文での prettier との競合を防ぐ
    indent: [2, 2, { SwitchCase: 1 }],
    'lines-between-class-members': 0,
    'no-console': 1,

    /**
     * eslint-plugin-import
     */
    'import/extensions': [
      2,
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
        json: 'never',
      },
    ],
    'import/no-unresolved': [1, { commonjs: true, amd: true }],
    'import/no-extraneous-dependencies': [1, { devDependencies: true }],
    'import/prefer-default-export': 0,

    /**
     * eslint と @typescript-eslint 競合を防ぐ
     */
    // typescript-eslint の no-use-before-define を有効にする
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 2,
    // typescript-eslint の no-unuserd-vars を有効にする
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 2,

    // typescript-eslint が上手く推論できでない?
    // https://github.com/typescript-eslint/typescript-eslint/issues/2109
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-call': 0,

    /**
     * eslint-plugin-react
     */
    // tsx も有効にする
    'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
    'react/prop-types': 0,
  },
};
