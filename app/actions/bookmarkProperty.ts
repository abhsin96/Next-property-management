"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessonUser } from "@/utils/getSessonUser";
import { revalidatePath } from "next/cache";

const bookmarkProperty = async (propertyId: string) => {
  await connectDB();

  const sessionUser = await getSessonUser();
  if (!sessionUser) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);
  let isBookmarked: boolean = user.bookmarks.includes(propertyId);
  let message;

  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = "Property removed from bookmarks";
    isBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    message = "Property added to bookmarks";
    isBookmarked = true;
  }

  await user.save();
  revalidatePath("/properties/saved", "page");

  return {
    message,
    isBookmarked,
  };
};

export default bookmarkProperty;
