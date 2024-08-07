import NextAuth, { type DefaultSession } from 'next-auth';
import 'next-auth/jwt';
import discord from 'next-auth/providers/discord';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    discord({ authorization: 'https://discord.com/api/oauth2/authorize?scope=identify+guilds' }),
  ],
  callbacks: {
    jwt: ({ token, account }) => {
      if (account?.access_token && account.expires_at && account.providerAccountId) {
        token.access_token = account.access_token;
        token.expires_at = account.expires_at;
        token.user_id = account.providerAccountId;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.accessToken = token.access_token;
      session.user.expiresAt = token.expires_at;
      session.user.id = token.user_id;
      return session;
    },
  },
});

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
      expiresAt: number;
      id: string;
      name: string;
      image: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    expires_at: number;
    user_id: string;
  }
}
