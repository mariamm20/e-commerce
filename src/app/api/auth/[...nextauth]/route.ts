import NextAuth, { AuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { type: "email", label: "email" },
                password: { type: "password", label: "password" }
            },
            async authorize(credentials) {
                const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(credentials)
                })
                const user = await response.json();
                console.log("USER FROM API:", user);
                if (response.ok)
                    return user

                return null
            }

        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async session({ session, user, token }) {
            return {...session, ...user, ...token}
        },
        async jwt({ token, user }) {
            return { ...token, ...user }
        }

    }

}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
