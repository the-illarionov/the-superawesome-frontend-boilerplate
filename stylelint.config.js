/** @type {import('stylelint').Config} */

export default {
  plugins: [
    '@stylistic/stylelint-plugin',
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-vue',
    '@stylistic/stylelint-config',
    'stylelint-config-clean-order',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'no-empty-source': null,
    'at-rule-no-deprecated': null,
  },
}
