

import { faildlogin, successlogin } from "@/typedata/authinterface";
import { NextAuthOptions } from "next-auth";
import { now } from "next-auth/client/_utils";
import Credentials from "next-auth/providers/credentials";


export const AuthOptions: NextAuthOptions = {
    pages: {
        signIn: '/login',
    },

    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: {},
                password: {},

            },
            authorize: async (credentials) => {
                const respons = await fetch(`${process.env.API}/auth/signin`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                const payload: faildlogin | successlogin = await respons.json()

                console.log(payload);


                if ('token' in payload) {
                    return {
                        id: payload.user.email,
                        user: payload.user,
                        token: payload.token,

                    }
                }
                else {
                    throw new Error('error....')
                }

            }

        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.user = user.user
                token.token = user.token
            }
            return token
        },
        session: ({session , token}) => {
session.user= token.user
return session
        }
    }
}