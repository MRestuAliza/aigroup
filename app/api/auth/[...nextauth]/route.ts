import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthOptions } from "next-auth";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, 

  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDB();
          await User.findOneAndUpdate(
            { email: user.email },
            {
              $set: {
                name: user.name,
                avatarUrl: user.image,
              },
              $setOnInsert: {
                email: user.email,
                plan: "free",
                createdAt: new Date(),
              },
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
          );

          return true;
        } catch (error) {
          console.error("Error saving user to DB:", error);
          return false;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
        return `${baseUrl}/dashboard`;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email });
        
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.plan = dbUser.plan;
        }
      }

      if (trigger === "update" && session?.plan) {
        token.plan = session.plan;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.plan = token.plan as string;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  pages: {
    error: '/auth/error', 
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };