import connectDB from "@/config/database";
import User from "@/models/User";
import { Account, AuthOptions, Profile, User as UserType } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
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
    async signIn({
      user,
      account,
      profile,
      email,
      credentials,
    }: {
      user: UserType | AdapterUser;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, any>;
    }): Promise<boolean> {
      await connectDB();
      if (!profile) {
        return false;
      }

      const useExists = await User.findOne({ email: profile.email });

      if (!useExists) {
        const username = (profile.name ?? "").slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.image,
        });
      }
      return true;
    },

    async session({ session }: { session: any }): Promise<any> {
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user?._id.toString();
      return session;
    },
  },
};
