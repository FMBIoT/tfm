module.exports = {
  env: {
    jest: true,
  },
  globals: {
    __basedir: true,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: [
          'node_modules',
          '../../app'
        ]
      }
    }
  },
  extends: 'airbnb-base',
  rules: {
    'comma-dangle': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    // 'import/no-dynamic-require': 0,
    'import/no-unresolved': 1, 
    camelcase: 0,
  }
};
