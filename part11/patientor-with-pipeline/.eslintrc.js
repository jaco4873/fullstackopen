// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended" 
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  settings: {
    react: {
      version: "detect" 
    },
  },
  rules: {
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "no-case-declarations": "off",
    "react/react-in-jsx-scope": "off", 
    "react/jsx-uses-react": "off",
    "react/prop-types": "off"
  },
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.resolve(__dirname, "./tsconfig.eslint.json"),
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true 
    }
  },
};
