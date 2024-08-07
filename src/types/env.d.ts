declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * サーバーID
     */
    readonly GUILD_ID: string;

    /**
     * trustedロールのID
     */
    readonly TRUSTED_ROLE: string;

    /**
     * データベースの接続URL
     */
    readonly DATABASE_URL: string;

    /**
     * データベースのコレクション名
     */
    readonly DATABASE_NAME: string;

    /**
     * セッションに使用するシークレットキー
     */
    readonly AUTH_SECRET: string;

    /**
     * DiscordBotのクライアントID
     */
    readonly AUTH_DISCORD_ID: string;

    /**
     * DiscordOauth2のクライアントシークレット
     */
    readonly AUTH_DISCORD_SECRET: string;

    /**
     * DiscordBotのトークン
     */
    readonly DISCORD_TOKEN: string;
  }
}
