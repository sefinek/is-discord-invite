/**
 * Options for selecting which Discord invitation URL patterns should be checked.
 */
export interface RegexOptions {
	defaultDiscordUrls?: boolean;
	otherDiscordUrls?: boolean;
	disboard?: boolean;
	discordMe?: boolean;
	discordhome?: boolean;
	everything?: boolean;
}

export type RegexFilters = RegexOptions;

export interface InviteUrl {
	full: string;
	invitationCode: string;
	fetchedCode: string;
}

export type Url = InviteUrl;

export interface DiscordAvatarDecorationData {
	asset?: string;
	sku_id?: string;
}

export interface DiscordInviter {
	id?: string;
	username?: string;
	avatar?: string | null;
	discriminator?: string;
	public_flags?: number;
	premium_type?: number;
	flags?: number;
	banner?: string | null;
	accent_color?: number | null;
	global_name?: string | null;
	avatar_decoration_data?: DiscordAvatarDecorationData | null;
	banner_color?: string | null;
}

export interface DiscordGuild {
	id?: string;
	name?: string;
	splash?: string | null;
	banner?: string | null;
	description?: string | null;
	icon?: string | null;
	features?: string[];
	verification_level?: number;
	vanity_url_code?: string | null;
	nsfw_level?: number;
	nsfw?: boolean;
	premium_subscription_count?: number;
}

export interface OnlineInviteResponse {
	success: true;
	code: 200;
	isInvitation: true;
	message: 'Success';
	url: InviteUrl;
	inviter: DiscordInviter;
	guild: DiscordGuild;
	invitationCode?: undefined;
	discordResponse?: undefined;
}

export interface OnlineNoInviteResponse {
	success: boolean;
	code?: number | null;
	isInvitation: false;
	message: string;
	url: Record<string, unknown> | null;
	inviter?: DiscordInviter | null;
	guild?: DiscordGuild | null;
	invitationCode?: string | null;
	discordResponse?: unknown;
}

export type OnlineResponse = OnlineInviteResponse | OnlineNoInviteResponse;
export type SefinekAPIResponse = OnlineResponse;

/**
 * Checks if the given string contains a Discord server invitation link.
 *
 * This validation is based only on URL patterns and does not verify whether
 * the invitation exists on Discord.
 *
 * @param message The input string to check.
 * @param options Optional filters for selecting supported invitation URL patterns.
 * @returns `true` if the string contains a matching invitation URL, otherwise `false`.
 */
export function regex(message: string, options?: RegexOptions): boolean;

/**
 * Checks for Discord invitation links in the given string and verifies them
 * against the Discord API.
 *
 * @param message The input string to search.
 * @returns A promise resolving to invitation data or a negative validation result.
 */
export function online(message: string): Promise<OnlineResponse>;
