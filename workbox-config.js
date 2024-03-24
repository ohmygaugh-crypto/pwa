module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{css,tsx,svg,ts}'
	],
	swDest: 'public/sw.ts',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};