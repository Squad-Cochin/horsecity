codemodule.exports = function(config) {
	config.set({
	frameworks: ['jasmine'],
	files: [
	'src/**/*.spec.js' // Path to your test files
	],
	preprocessors: {
	'src/**/*.spec.js': ['webpack']
	},
	webpack: {
	// webpack configuration for your React.js application
	// e.g., entry point, loaders, etc.
	},
	browsers: ['Chrome'], // You can change the browser if needed
	reporters: ['progress'],
	singleRun: true
	});
};