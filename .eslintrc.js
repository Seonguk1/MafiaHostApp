module.exports = {
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': ['error'], // Prettier 규칙을 ESLint에서 오류로 표시
    },
  };
  