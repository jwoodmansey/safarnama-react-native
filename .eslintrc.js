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
  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off"
  }
};
