import { authClient } from "@/lib/auth-client"

export const { useSession, signIn, signUp, signOut } = authClient
