import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import config from "@/config";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: {
        params: {
          scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.sub;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID to the session
      if (session.user) {
        session.user.id = token.sub as string;
        // The email is already included in the session.user object by default
        // session.user.email contains the primary email
        
        // You can also add the access token if needed for API calls
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to the callback URL defined in config
      if (url.startsWith("/")) {
        return `${baseUrl}${config.auth.callbackUrl}`;
      }
      // Redirect to the base URL if the URL is not allowed
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };