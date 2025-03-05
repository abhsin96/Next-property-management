import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const getSessonUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }

  return {
    user: session.user,
    userId: session.user.id,
  };
};
