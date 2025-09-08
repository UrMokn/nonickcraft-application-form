# nonickcraft-application-form
![preview](/.github/assets/preview.png)

**NoNICK様が作成したものを勝手に使いやすくしたものです**
[本家](https://github.com/team-nonick/nonickcraft-application-form)

UrMoknCraft鯖の参加申請を受け付けるWebアプリケーション  
[Next.js](https://nextjs.org/)、[Auth.js](https://authjs.dev/)を使用して構築されています。

## 📑Usage
### Discordアプリケーションを作成する
まず、[Discord開発者ポータル](https://discord.com/developers/applications)でWebダッシュボードに使うDiscordアプリケーションを作成する必要があります。アプリケーションを作成したら、「OAuth2」タブにアクセスし、`Redirects`に以下のURLを追加してください。

* `http://localhost:3000/api/auth/callback/discord`

### 環境変数を設定する
ルートディレクトリに`.env`ファイルを作成し、環境変数を設定します。

|変数名|説明|
|---|---|
|`GUILD_ID`|申請時に参加が必須なサーバーのID|
|`TRUSTED_ROLE`|申請受理後つけられるロールのID(TRUSTED_ROLEとなっていますが面倒くさいのでそのままで)|
|`DATABASE_URL`|MongoDBの接続に使用するURL|
|`DATABASE_NAME`|MongoDBのコレクション名|
|`AUTH_SECRET`|セッションに使用するシークレットキー|
|`AUTH_DISCORD_ID`|DiscordBotのクライアントID|
|`AUTH_DISCORD_SECRET`|DiscordOauth2のクライアントシークレット|
|`DISCORD_TOKEN`|DiscordBotのトークン|

以下のコマンドで`AUTH_SECRET`の値を作成できます。
```sh
openssl rand -base64 32
```

設定が終わったら、以下のコマンドを使用して開発サーバーを起動します。

```sh
pnpm dev
```
