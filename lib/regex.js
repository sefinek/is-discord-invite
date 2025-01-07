const discordPatterns = [
	/discord(?:app\.com\/invite|\.(?:com\/invite|gg))\//gi,
	/(?:watchanimeattheoffice|discordsays)\.com\/invite\//gi,
	/disboard\.org\/(?:(?:en\/)?|pl\/)server\/join/gi,
	/discordhome\.com\/join\//gi,
	/discord\.me\/server\/join\//gi,
];

module.exports = (message, options = {}) => {
	const {
		defaultDiscordUrls = true,
		otherDiscordUrls = true,
		disboard = true,
		discordMe = true,
		discordhome = true,
		everything = false,
	} = options;

	// Determine which patterns to use based on the options
	const shouldUseAll = everything || !Object.keys(options).length;
	const activePatterns = discordPatterns.filter((_, index) =>
		shouldUseAll || [defaultDiscordUrls, otherDiscordUrls, disboard, discordMe, discordhome][index]
	);

	// Combine active patterns into a single regex.
	const regex = new RegExp(activePatterns.map(pattern => pattern.source).join('|'), 'gi');

	// Test the message against the combined regex.
	return regex.test(message);
};