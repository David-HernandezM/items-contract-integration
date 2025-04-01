import { Backend_URL } from "@/app/lib/Constants";
import { NextAuthOptions, Account, Profile } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

async function handleGoogleLogin(username: string, password: string) {
  try {
    const response = await axios.post('http://localhost:8000/auth/login', {username, password});
    return response.data;
  } catch (e: any) {
    if (e.status !== 401) return null;

    // if need it, you can write more code in case of error in the login
  }

  try {
    await axios.post('http://localhost:8000/auth/register', {username, password});
  } catch (e: any) {
    if (e.status !== 201) return null;

    // if you need it, you can write more code in case that register throw an error
  }

  const response = await axios.post('http://localhost:8000/auth/login', {username, password});

  return response.data;
}

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(Backend_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const res = await fetch(Backend_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status == 401) {
          console.log(res.statusText);

          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user && Object.keys(user).includes('backendTokens')) return { ...token, ...user };

      if (account?.provider === "google" && profile) {
        const username = (profile.name ?? '') + (profile.email ?? '') + process.env.GOOGLE_USERNAME_SECRET;
        const password = (profile.email ?? '') + (profile.sub ?? '') + process.env.GOOGLE_USER_PASSWORD_SECRET;
        const backendResponse = await handleGoogleLogin(username, password);

        const user = {
          ...backendResponse.user,
          googleName: profile.name
        };

        const googleToken = {
          ...backendResponse,
          user
        };

        return googleToken;
      }

      if (new Date().getTime() < token.backendTokens.expiresIn)
        return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },

    async redirect({url, baseUrl}) {
      if (url === `${baseUrl}/api/auth/signout`) {
        return url;
      }

      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
