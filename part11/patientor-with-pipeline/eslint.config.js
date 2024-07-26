// eslint.config.js
module.exports [
  {
    files: ["**/*.ts"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    plugins: ["@typescript-eslint"],
    env: {
      es6: true,
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
    },
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "./tsconfig.json",
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  {
    files: ["client/src/**/*.ts", "client/src/**/*.tsx"],
    extends: [
      "plugin:react/recommended",
      "plugin:react-hooks/recommended" 
    ],
    plugins: ["react", "react-hooks"],
    env: {
      browser: true,
    },
    settings: {
      react: {
        version: "detect" 
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", 
      "react/jsx-uses-react": "off",
      "react/prop-types": "off"
    }
  },
  {
    files: ["server/src/**/*.ts"],
    env: {
      node: true,
    },
  }
];