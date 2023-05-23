module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  plugins: ['react'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error'],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
      },
    ],
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/array-type': 'off',
    'multiline-ternary': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    'react/display-name': 'off',
  },
};
