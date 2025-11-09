/**
 * Authentication Configuration
 * Location: src/auth/config.ts
 * Follows official NextAuth.js v5 best practices
 * https://authjs.dev
 */

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import authService from "@/services/auth.service"

// Type definitions for session and JWT
declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      email?: string
      name?: string
    }
    accessToken?: string
    refreshToken?: string
    tokenExpiry?: string
  }

  interface User {
    id: string
    email: string
    name: string
    accessToken?: string
    refreshToken?: string
    tokenExpiry?: string
  }
}

// NextAuth Configuration
export const authConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        token: { label: "Token", type: "text" },
        refreshToken: { label: "Refresh Token", type: "text" },
        tokenExpiry: { label: "Token Expiry", type: "text" },
        user: { label: "User", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null
        }

        // Handle OAuth callback with pre-generated tokens
        if (credentials?.token && credentials?.user) {
          try {
            const user = JSON.parse(credentials.user as string)
            return {
              id: user.id?.toString() || credentials.email,
              email: user.email || credentials.email,
              name: user.fullName || user.name || "",
              accessToken: credentials.token as string,
              refreshToken: credentials.refreshToken as string,
              tokenExpiry: credentials.tokenExpiry as string,
            }
          } catch (error) {
            console.error("OAuth token parsing error:", error)
            return null
          }
        }

        // Handle standard credentials login
        if (!credentials?.password) {
          return null
        }

        try {
          const response = await authService.signin({
            email: credentials.email as string,
            password: credentials.password as string,
          })

          if (response.success && response.user) {
            return {
              id: response.user.id.toString(),
              email: response.user.email,
              name: response.user.fullName,
              accessToken: response.token,
              refreshToken: response.refreshToken,
              tokenExpiry: response.tokenExpiry,
            }
          }
        } catch (error) {
          console.error("Signin error:", error)
        }

        return null
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = (user as any).id
        token.email = user.email
        token.name = user.name
        token.accessToken = (user as any).accessToken
        token.refreshToken = (user as any).refreshToken
        token.tokenExpiry = (user as any).tokenExpiry
      }
      return token
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = (token.id as string) || ""
        session.user.email = (token.email as string) || ""
        session.user.name = (token.name as string) || ""
      }
      session.accessToken = (token.accessToken as string) || ""
      session.refreshToken = (token.refreshToken as string) || ""
      session.tokenExpiry = (token.tokenExpiry as string) || ""
      return session
    },
    async redirect({ url, baseUrl }: any) {
      // Always redirect to dashboard after successful login
      console.log('Redirect callback called with:', { url, baseUrl });
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  events: {
    async signOut() {
      // Handle signout if needed
    },
  },
}
