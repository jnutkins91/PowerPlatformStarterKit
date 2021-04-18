/* eslint-disable no-undef */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-undef': 'off',
      'prettier/prettier': 'off',
      'no-inner-declarations': 'off',
    },
  };