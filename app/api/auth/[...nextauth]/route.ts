import { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import NextAuth from 'next-auth'
const options: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        }),
    ],
}


const handler = NextAuth(options)

export { handler as GET, handler as POST }