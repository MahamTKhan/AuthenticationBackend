// eslint.config.js
const prettier = require('eslint-plugin-prettier');

/** @type {import('eslint').FlatConfig} */
module.exports = [
  {
    languageOptions: {
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: prettier,
    },
    rules: {
      'spaced-comment': ['warn', 'always'], // Enforces a space after comment tags
      'func-name-matching': [
        'error',
        'always',
        { includeCommonJSModuleExports: false },
      ], // Enforces function names to match the function's name in assignments
      indent: ['error', 2], // Enforces 2 spaces for indentation
      'linebreak-style': ['off', 'unix'], // Enforces Unix-style linebreaks
      quotes: ['error', 'single'], // Enforces single quotes
      semi: ['error', 'always'], // Enforces semicolons at the end of statements
      'no-console': 'off', // Warns about console statements
      eqeqeq: 'error', // Requires === and !== for comparisons
      curly: 'error', // Requires curly braces for all control statements
      'consistent-return': 'off', // Disables the rule that requires consistent return values
      'func-names': 'off', // Disables the rule that requires function names
      'object-shorthand': 'off', // Disables the rule that enforces shorthand object notation
      'no-process-exit': 'off', // Disables the rule that disallows process.exit()
      'no-underscore-dangle': 'off', // Disables the rule that disallows dangling underscores
      'class-methods-use-this': 'off', // Disables the rule that requires class methods to use `this`
      'no-param-reassign': 'off', // Disables the rule that disallows parameter reassignment
      'no-return-await': 'off', // Disables the rule that disallows unnecessary return await
      'prefer-destructuring': ['error', { object: true, array: false }], // Enforces object destructuring but not array destructuring
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^(_|req|res|next|val)$',
        },
      ],
      camelcase: [
        'error',
        { properties: 'always', ignoreDestructuring: false },
      ], // Enforces camelCase for variables and functions
    },
  },
];

