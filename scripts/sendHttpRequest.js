const https = require('https');
const { name, version, devDependencies } = require('../package.json');

const headers = {
	'User-Agent': `${name}/${version} (+https://github.com/sefinek24/is-discord-invite)${process.env.JEST_WORKER_ID === undefined ? '' : ` jest/${devDependencies.jest.replace('^', '')}`}`,
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	'Cache-Control': 'no-cache',
	'CF-IPCountry': 'false',
	'CF-Visitor': '{"scheme":"https"}',
	'Connection': 'keep-alive',
	'DNT': '1',
	'Pragma': 'no-cache',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY',
	'X-XSS-Protection': '1; mode=block',
};

const extractCode = discordLink => {
	try {
		const parsedUrl = new URL(discordLink);
		const pathname = parsedUrl.pathname;

		return pathname.startsWith('/invite/') ? pathname.substring('/invite/'.length) : pathname.substring(1);
	} catch (err) {
		return null;
	}
};

const httpRequest = (url, options) => {
	return new Promise((resolve, reject) => {
		const req = https.get(url, options, (res) => {
			let data = '';

			res.on('data', chunk => {
				data += chunk;
			});

			res.on('end', () => {
				try {
					const parsedData = JSON.parse(data);
					resolve({ data: parsedData, statusCode: res.statusCode });
				} catch (err) {
					resolve({ data, statusCode: res.statusCode });
				}
			});
		});

		req.on('error', (err) => {
			reject(err);
		});

		req.end();
	});
};

module.exports = async url => {
	if (!url) return { success: false, code: 200, isInvitation: false, message: 'Validation error. Missing invitation.', url: {}, inviter: null, guild: null };
	if (url.length >= 68) return { success: false, code: 200, isInvitation: false, message: 'Validation error. Invitation is too long.', url: {}, inviter: null, guild: null };

	const invitation = extractCode(url);
	if (!invitation) return { success: false, code: 200, isInvitation: false, message: 'Validation error. Unknown invitation.', url: {}, inviter: null, guild: null };

	try {
		const res = await httpRequest(`https://discord.com/api/v10/invites/${invitation}`, { headers });
		if (res.statusCode !== 200) return { success: true, code: res.statusCode, isInvitation: false, message: res.message || 'Discord API error.', url: res.code || {}, inviter: res.data.inviter || {}, guild: res.data.guild || {} };

		return {
			success: true,
			code: 200,
			isInvitation: true,
			message: 'Success',
			url: {
				full: url,
				invitationCode: invitation,
				fetchedCode: res.data.code || {},
			},
			inviter: res.data.inviter || {},
			guild: res.data.guild || {},
		};
	} catch (err) {
		const status = err.response ? err.response.status : undefined;
		return { success: false, code: status, isInvitation: false, message: err.message, url: {}, inviter: null, guild: null };
	}
};
