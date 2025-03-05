"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessonUser } from "@/utils/getSessonUser";

const isPropertyBookmarked = async (propertyId: string) => {
  await connectDB();

  const sessionUser = await getSessonUser();
  if (!sessionUser) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);
  let isBookmarked: boolean = user.bookmarks.includes(propertyId);

  return isBookmarked;
};

export default isPropertyBookmarked;
