const { es6, react } = {
	es6: true,
	react: true,
};

const config = {
	'root': true,
	'env': {
		'browser': true,
		'es6': es6,
	},
	'extends': [ 'eslint:recommended' ],
	'parserOptions': {
		'ecmaFeatures': {
			'experimentalObjectRestSpread': es6,
			'jsx': es6 && react,
		},
		'sourceType': es6 ? 'module' : 'script',
	},
	'rules': {
		'array-bracket-spacing': [ 'error', 'always' ],
		'arrow-parens': [ 'error', 'as-needed' ],
		'arrow-spacing': [ 'error', {
			'before': true,
			'after': true,
		} ],
		'block-spacing': [ 'error' ],
		'brace-style': [ 'error', '1tbs' ],
		'comma-dangle': [ 'error', 'always-multiline' ],
		'comma-spacing': [ 'error', {
			'before': false,
			'after': true,
		} ],
		'eol-last': [ 'error', 'unix' ],
		'eqeqeq': [ 'error' ],
		'func-call-spacing': [ 'error' ],
		'indent': [ 'error', 'tab', {
			'SwitchCase': 1,
		} ],
		'key-spacing': [ 'error', {
			'beforeColon': false,
			'afterColon': true,
		} ],
		'keyword-spacing': [ 'error', {
			'after': true,
			'before': true,
		} ],
		'linebreak-style': [ 'error', 'unix' ],
		'no-console': [ 'warn' ],
		'no-mixed-spaces-and-tabs': [ 'error', 'smart-tabs' ],
		'no-multiple-empty-lines': [ 'error', {
			'max': 1,
		} ],
		'no-trailing-spaces': [ 'error' ],
		'no-var': [ es6 ? 'warn' : 'off' ],
		'object-curly-newline': [ 'error', {
			'ObjectExpression': {
				'consistent': true,
				'minProperties': 2,
				'multiline': true,
			},
			'ObjectPattern': {
				'consistent': true,
				'multiline': true,
			},
			'ImportDeclaration': {
				'consistent': true,
				'multiline': true,
			},
			'ExportDeclaration': {
				'consistent': true,
				'minProperties': 2,
				'multiline': true,
			},
		} ],
		'object-curly-spacing': [ 'error', 'always' ],
		'object-property-newline': [ 'error' ],
		'quotes': [ 'error', 'single' ],
		'semi-spacing': [ 'error', {
			'before': false,
			'after': true,
		} ],
		'space-before-function-paren': [ 'error', {
			'anonymous': 'always',
			'asyncArrow': 'always',
			'named': 'never',
		} ],
		'space-in-parens': [ 'warn', 'always', {
			'exceptions': [ 'empty' ],
		} ],
		'space-unary-ops': [ 'error', {
			'words': true,
			'nonwords': false,
			'overrides': {
				'!': true,
			},
		} ],
		'yoda': [ 'error', 'never' ],
	},
};

if ( es6 && react ) {

	config['extends'] = [ 'eslint:recommended', 'react-app' ];
	config['rules']['react/jsx-curly-spacing']   = [ 'error', 'always' ];
	config['rules']['react/jsx-wrap-multilines'] = [ 'error' ];
	config['rules']['jsx-a11y/anchor-is-valid']  = [ 'error' ];

	// href-no-hash has been removed from jsx-a11y: this line silences an error
	// caused by eslint-config-react-app still using the deprecated rule, and
	// can be removed once the react-app config is updated to a recent jsx-a11y.
	config['rules']['jsx-a11y/href-no-hash']    = [ 'off' ];
}

module.exports = config;
