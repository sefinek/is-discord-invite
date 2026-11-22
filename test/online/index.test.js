const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const IsInvitation = require('../../index.js');

describe('#IsInvitation.online', () => {
	it('Empty string', async () => {
		const result = await IsInvitation.online('');

		assert.equal(result.success, true);
		assert.equal(result.code, undefined);
		assert.equal(result.isInvitation, false);
		assert.equal(result.url, null);
		assert.equal(result.invitationCode, null);
	});

	it('Is Discord invitation', async () => {
		const invitationCode = 'HjEyuee4mc';
		const url = `https://discord.gg/${invitationCode}`;
		const text = `Check out this Discord link: ${url}`;
		const result = await IsInvitation.online(text);

		assert.equal(result.success, true);
		assert.equal(result.code, 200);
		assert.equal(result.isInvitation, true);
		assert.equal(result.url.full, url);
		assert.equal(result.url.fetchedCode, invitationCode);
	});

	it('Is not Discord invitation', async () => {
		const invitationCode = '2137XXXXXXXX2137';
		const url = `https://discord.gg/${invitationCode}`;
		const text = `Check out this Discord link: ${url}`;
		const result = await IsInvitation.online(text);

		assert.equal(result.success, true);
		assert.equal(result.code, null);
		assert.equal(result.isInvitation, false);
		assert.equal(result.url, null);
		assert.equal(result.invitationCode, undefined);
	});

	it('No valid links', async () => {
		const text = 'This is a random text without any Discord links.';
		const result = await IsInvitation.online(text);

		assert.equal(result.success, true);
		assert.equal(result.code, undefined);
		assert.equal(result.isInvitation, false);
		assert.equal(result.message, 'Not found any Discord invitation links');
		assert.equal(result.url, null);
		assert.equal(result.invitationCode, null);
		assert.equal(result.discordResponse, undefined);
	});

	it('Error sending requests to the API server', async () => {
		const text = 'https://discord.gg/invalidlink';
		const result = await IsInvitation.online(text);

		assert.equal(result.success, true);
		assert.equal(result.code, null);
		assert.equal(result.isInvitation, false);
		assert.equal(result.message, 'No valid links found');
		assert.equal(result.url, null);
		assert.equal(result.invitationCode, undefined);
		assert.equal(result.discordResponse, undefined);
	});

	it('Zero-width space', async () => {
		const text = '​​​​​​';
		const result = await IsInvitation.online(text);

		assert.equal(result.success, true);
		assert.equal(result.code, undefined);
		assert.equal(result.isInvitation, false);
		assert.equal(result.message, 'Not found any Discord invitation links');
		assert.equal(result.url, null);
		assert.equal(result.invitationCode, null);
		assert.equal(result.discordResponse, undefined);
	});
});
