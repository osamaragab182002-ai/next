
import { JWT } from "next-auth/jwt"
import { UserResponse } from "./authinterface"


import NextAuth, { DefaultSession, User } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
   interface User{
    user : UserResponse
    token : String
  }

  interface Session {
    user : UserResponse ,
  }
}




declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends User{
    /** OpenID ID Token */
    idToken?: string
  }
}