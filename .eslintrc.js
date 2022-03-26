module.exports = {
  root: true,
  extends: ['@react-native-community', 'airbnb-typescript', 'prettier', 'prettier/@typescript-eslint', 'prettier/react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'i18next'],
  rules: {
    'i18next/no-literal-string': [
      1,
      {
        markupOnly: true,
        onlyAttribute: ['label', 'title', 'subTitle'],
        validateTemplate: true,
        ignoreCallee: ['openURL', 'log'],
      },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "no-underscore-dangle": "off",
    "no-console": "off"
  },
};