module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json']
  },
  plugins: ['jsdoc'],
  extends: [
    'plugin:jsdoc/recommended',
    '@tribecamp/base',
    '@tribecamp/typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/unicorn'
  ],
  root: true,
  env: {
    node: true
  },
  rules: {
    'no-console': 'off',
    'jsdoc/require-jsdoc': [
      'error',
      {
        publicOnly: true,
        require: {
          ClassDeclaration: true,
          ClassExpression: true,
          MethodDefinition: true
        },
        exemptEmptyConstructors: true,
        checkConstructors: false
      }
    ],
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns': 'off'
  }
};
