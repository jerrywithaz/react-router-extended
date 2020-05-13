module.exports = {
    env: {
        browser: true
    },
    parser: '@typescript-eslint/parser', 
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended", 
      "plugin:jsx-a11y/recommended"
    ],
    ignorePatterns: ["dist/**/*", "examples/**/*"],
    plugins: [
      "react"
    ],
    parserOptions: {
      ecmaVersion: 2018, 
      sourceType: 'module',  
      ecmaFeatures: {
        jsx: true
      }
    },
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "@typescript-eslint/no-explicit-any": "off"
    }
  };