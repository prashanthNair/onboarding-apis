module.exports = {
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "standard"
    ],
    "env": {
      "node": true
    },
    "parser": "@typescript-eslint/parser",
    "plugins": [
      "@typescript-eslint",
    ],
    "settings": {
      "import/parsers": {
        "@typescript-eslint/parser": [
        ".ts",
        ".tsx"
      ]
      },
      "import/resolver": {
        "typescript": {} 
      }
    },
    "parserOptions": {
      "project": "./tsconfig.json",
      "tsconfigRootDir": "./",
      "sourceType": "module",
      "ecmaVersion": 2018
    },
    "rules": {
      "@typescript-eslint/no-explicit-any": "off",
      }
    }