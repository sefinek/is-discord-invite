<div align="center">
    <h1>Is this an invitation to a Discord server? ➕</h1>
    <p>
        This module checks whether a string is a Discord server invitation.
        If it is, it fetches information from the API to find out more about the server.
        An alternative (but inferior) method is validating the string solely through regex.
    </p>
    <a href="https://www.npmjs.com/package/is-discord-invite" target="_blank" title="is-discord-invite - npm" style="text-decoration:none">
        <img src="https://img.shields.io/npm/dt/is-discord-invite.svg?maxAge=3600" alt="npm downloads">
        <img src="https://img.shields.io/github/issues/sefinek/is-discord-invite" alt="Issues">
        <img src="https://img.shields.io/github/last-commit/sefinek/is-discord-invite" alt="Last commit">
        <img src="https://img.shields.io/github/commit-activity/w/sefinek/is-discord-invite" alt="Commit activity">
        <img src="https://img.shields.io/github/languages/code-size/sefinek/is-discord-invite" alt="Code size">
    </a>
</div>

## 📥 » Installation
```bash
npm install is-discord-invite
```

## ✨ Example bot made in Discord.js
> https://github.com/sefinek/is-discord-invitation-bot

## 🤔 » Table

| Function | Async/await | Options         | Validation                                 | Faster? | Reliability | Recommended |
|----------|:------------|-----------------|:-------------------------------------------|---------|-------------|:------------|
| online   | Yes         | [View](#online) | [API](https://discord.com/api/v10/invites) | ❌       | ✅           | ✅           |
| regex    | No          | [View](#regex)  | [Regex](grex.md)                           | ✅       | ❌           | ❌           |


## 🌍 API
### `online(message)` <div id="online"></div>
Checks for valid Discord invitation links in the provided text and fetches invitation data.

- `message` (string): The input text to search for Discord invitation links.

> **Returns** ([object](#invitation-data)): A Promise that resolves to an object with invitation data.

### Invitation Data
If a valid invitation link is found, the returned data will have the following structure:

```json
{
  "success": true,
  "code": 200,
  "isInvitation": true,
  "message": "Success",
  "url": {
    "full": "https://discord.gg/crtm7UKz",
    "invitationCode": "crtm7UKz",
    "fetched": "crtm7UKz"
  },
  "inviter": {
    "id": "614087461227986965",
    "username": "sefinek025",
    "avatar": "a_fc3d7404ae62d64ca4c3d777815ba167",
    "discriminator": "0",
    "public_flags": 256,
    "premium_type": 2,
    "flags": 256,
    "banner": "a_d9d11fb5320ce4cca30b7d85c837ce64",
    "accent_color": null,
    "global_name": "Sefinek 🌠",
    "avatar_decoration_data": {
      "asset": "a_88f42fb7360d8224a670a50c3496f315",
      "sku_id": "1174460780842856588"
    },
    "banner_color": null
  },
  "guild": {
    "id": "1002327795344621669",
    "name": "Pomoc IT - Sefinek",
    "splash": null,
    "banner": null,
    "description": null,
    "icon": "faf0e64797c69de5e14be94603935cd9",
    "features": [ "COMMUNITY", "CHANNEL_ICON_EMOJIS_GENERATED", "NEWS" ],
    "verification_level": 3,
    "vanity_url_code": null,
    "nsfw_level": 0,
    "nsfw": false,
    "premium_subscription_count": 0
  }
}
```

In case the invitation was not valid 100%:
```json
{
  "success": true,
  "code": null,
  "isInvitation": false,
  "message": "No valid links found",
  "url": null,
  "inviter": null,
  "guild": null
}
```

### `regex(message, { options })` <div id="regex"></div>
Checks if the given string contains Discord server invitations. Validation is based solely on the string itself.
In this case, the script does NOT verify whether the link is actually associated with a server.

- `message` (string): The input string to be checked.
- `options` (object, optional): An options object for customizing the behavior. You can customize which types of Discord server invitation links to check by setting specific options to `true` or `false`. Available options include:
    - `defaultDiscordUrls` (boolean, default `false`): Check default Discord invitation URLs.
    - `otherDiscordUrls` (boolean, default `false`): Checks other domains created by Discord Inc. that redirect to discord.com/*.
    - `disboard` (boolean, default `false`): Checks URL addresses associated with the **disboard.org** website.
    - `discordMe` (boolean, default `false`): Checks URL addresses associated with the **discord.me** website.
    - `discordhome` (boolean, default `false`): Checks URL addresses associated with the **discordhome.com** website.

If no options are provided, the `everything` option will be set to `true`, meaning that all types of Discord server invitation links will be checked.

> **Returns** (boolean): `true` if the input is a valid Discord server invitation link, `false` otherwise.


## 📄 » Examples
### 🧪 Online
In this case, `isInvitation` will be `true` due to the link with the code `HjEyuee4mc`, as it is the only valid one.

```js
const IsInvitation = require('is-discord-invite');

(async () => {
    const result = await IsInvitation.online(
        'Lorem ipsum dolor sit amet, https://discord.gg/notValid consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna https://discord.gg/HjEyuee4mc aliqua.",
    );

    console.log(result.isInvitation); // true
})();
```
If the regex detects any invitation, the script sends a [POST request](https://en.wikipedia.org/wiki/POST_(HTTP)) to the [API](https://en.wikipedia.org/wiki/API) to verify the link's validity.

### 🔡 Regex
Quick method, but definitely not recommended for most cases. `isInvitation` will be `true` even if the invitation has expired or simply doesn't work.

```js
const IsInvitation = require('is-discord-invite');

const result1 = IsInvitation.regex('https://discord.gg/HjEyuee4mc', { everything: true }); // Example with `everything` option
console.log(result1); // true

const result2 = IsInvitation.regex('https://discord.gg/notVaildUrl');
console.log(result2); // true

const result3 = IsInvitation.regex('https://example.com/bKzhAdd6Fa');
console.log(result3); // false
```


## 🤝 » Help
If you have any questions or just need help, please visit my [official website](https://sefinek.net), where you can find my email and my current Discord username. Feel free to send me a message on Discord or reach out via email.

> Alternatively, you can create a new [Issue](https://github.com/sefinek/is-discord-invite/issues/new).

## 🌿 Pull requests
Collaborators are welcome! If you'd like to contribute your suggestions or corrections to this project, we encourage you to create [Pull requests](https://github.com/sefinek/is-discord-invite/pulls).

## ⭐ » Thanks
Thank you for your interest in this module. If you like it or find it useful, please consider starring the [repository](https://github.com/sefinek/is-discord-invite).