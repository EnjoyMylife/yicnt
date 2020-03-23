module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'indent': 'off',
    
    'eqeqeq': 'off', // 全等于
    'space-before-function-paren': 'off', // 方法名后空格
    // 'semi': 'off', // 末尾分号 ; 
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
