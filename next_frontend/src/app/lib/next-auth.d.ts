import NextAuth from "next-auth";

export interface User {
    name: string;
    id: string;
}

export interface BackendTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

declare module "next-auth" {
    interface Session {
        user: User;
        backendTokens: BackendTokens;
    }
}

import { JWT } from "next-auth/jwt"; 

declare module "next-auth/jwt" {
    interface JWT {
        user: User;
        backendTokens: BackendTokens;
    }
}