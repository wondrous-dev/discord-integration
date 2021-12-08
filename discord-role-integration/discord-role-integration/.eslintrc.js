module.exports = {
	env: {
		es2020: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'standard'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 11,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint'],
	rules: {
		indent: [2, 'tab', { SwitchCase: 1, VariableDeclarator: 1 }],
		'no-unused-vars': 'off',
		'dot-notation': 0,
		'no-tabs': 0
	}
}
