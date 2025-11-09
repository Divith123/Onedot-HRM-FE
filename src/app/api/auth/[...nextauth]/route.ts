/**
 * NextAuth Route Handler
 * Location: src/app/api/auth/[...nextauth]/route.ts
 * Exports GET and POST handlers for NextAuth
 */

import { handlers } from "@/auth"

export const { GET, POST } = handlers