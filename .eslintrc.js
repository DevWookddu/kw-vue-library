module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'info', 'error', 'debug'] }],
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    'prefer-const': 'error',
    eqeqeq: ['error', 'always'],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        ignoredMethodNames: [
          'beforeCreate',
          'created',
          'beforeMount',
          'mounted',
          'beforeUpdate',
          'beforeDestroy',
          'destroyed',
          'updated',
          'activated',
          'deactivated',
          'beforeUnmount',
          'unmounted',
        ],
        overrides: {
          accessors: 'no-public',
          constructors: 'no-public',
          methods: 'explicit',
          properties: 'explicit',
          parameterProperties: 'explicit',
        },
      },
    ],
    'prettier/prettier': [
      'error',
      {
        htmlWhitespaceSensitivity: 'ignore',
        trailingComma: 'all',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        printWidth: 120,
      },
    ],
  },
};
