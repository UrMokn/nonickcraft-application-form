import 'server-only';
import chalk from 'chalk';
import type { RESTAPIPartialCurrentUserGuild, RESTRateLimit } from 'discord-api-types/v10';
import { Discord } from './constants';
import { wait } from './utils';

const { Endpoints } = Discord;

/** ユーザーが参加しているDiscordサーバーを取得 */
export async function getUserGuilds(accessToken: string) {
  const res = await fetchWithDiscordRateLimit(`${Endpoints.API}/users/@me/guilds`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error(res.statusText);
  return await res.json<RESTAPIPartialCurrentUserGuild[]>();
}

/** `fetch()`を拡張した関数 レート制限によりリクエストが拒否された場合、`retry_after`秒待機した後に再度リクエストを行う。 */
async function fetchWithDiscordRateLimit(
  input: URL | RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  const res = await fetch(input, init);

  if (res.status === 429) {
    const data = await res.json<RESTRateLimit>();
    const retryAfter = Math.ceil(data.retry_after);

    if (data.global) {
      throw new Error('Global Rate Limit Exceeded');
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(
        [
          chalk.yellow.bold('[429]'),
          chalk.white(`${retryAfter}秒後に再試行します...`),
          chalk.dim(`(${input.toString()})`),
        ].join(' '),
      );
    }

    await wait(retryAfter * 1000);
    return await fetchWithDiscordRateLimit(input, init);
  }

  return res;
}
