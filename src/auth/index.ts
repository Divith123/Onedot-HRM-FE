/**
 * NextAuth Entry Point
 * Location: src/auth/index.ts
 * Exports: handlers, signIn, signOut, auth
 */

import NextAuth from "next-auth"
import { authConfig } from "./config"

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig as any)
