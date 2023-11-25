import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/github"
import { Provider } from "next-auth/providers/index"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ] as Provider[],
  secret:process.env.NEXTAUTH_SECRET,
  session:{
    strategy:'jwt',
    maxAge:30*24*60*60,
  },
  jwt:{
    encryption:true
  }
}

export default NextAuth(authOptions)
// export { handler as GET, handler as POST }
