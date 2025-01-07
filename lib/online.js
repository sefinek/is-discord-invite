const sendHttpRequest = require('../scripts/sendHttpRequest.js');
const discordLinkRegex = /(https:\/\/discord\.(?:gg|com)(?:\/invite)?\/[a-zA-Z0-9-]+(?:-\d{18,19})?)/gim;

module.exports = async message => {
	// If no text or an empty string is provided, return a default object
	if (!message || message.length === 0) {
		return {
			success: true,
			code: undefined,
			isInvitation: false,
			message: 'String is empty',
			url: null,
			invitationCode: null,
			discordResponse: undefined,
		};
	}

	// Match Discord invitation links in the text
	const discordLinks = message.match(discordLinkRegex);

	// If no links or an empty array is found, return a default object
	if (!discordLinks || discordLinks.length === 0) {
		return {
			success: true,
			code: undefined,
			isInvitation: false,
			message: 'Not found any Discord invitation links',
			url: null,
			invitationCode: null,
			discordResponse: undefined,
		};
	}

	// Iterate through the links and fetch invitation data
	for (const link of discordLinks) {
		const result = await sendHttpRequest(link);

		// If a valid invitation link is found, return the data
		if (result.success && result.isInvitation) return result;
	}

	// If no valid invitations are found, return default values
	return { success: true, code: null, isInvitation: false, message: 'No valid links found', url: null, inviter: null, guild: null };
};