module.exports = {
	extends: 'standard',
	rules: {
		// mocha it, xit describe ... etc.
		'no-undef': 0,

		// expect.toNotExist is not a function.
		'no-unused-expressions': 0
	},

  plugins: [
    'html'
  ]
};
