module.exports = {
  'root': true,
  'env': {
    'node': true
  },
  'extends': [
    'plugin:vue/recommended',
    'plugin:vue/essential'
  ],
  'rules': {
    'no-console': 'off',
    'vue/no-parsing-error': [
      'error',
      {
        'x-invalid-end-tag': false
      }
    ],
    'vue/no-unused-vars': 0,
    'vue/html-self-closing': [
      'error',
      {
        'html': {
          'void': 'never',
          'normal': 'always',
          'component': 'never'
        },
        'svg': 'always',
        'math': 'always'
      }
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        'multiline': 'never'
      }
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        'singleline': 1,
        'multiline': {
          'max': 1,
          'allowFirstLine': false
        }
      }
    ],
    'quotes': [
      2,
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ],
    'semi': [
      2,
      'never',
      {
        'beforeStatementContinuationChars': 'never'
      }
    ]
  },
  'parserOptions': {
    'parser': 'babel-eslint'
  }
}
