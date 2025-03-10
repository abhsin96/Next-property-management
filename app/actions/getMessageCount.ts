"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessonUser } from "@/utils/getSessonUser";

async function getUnreadMessageCount() {
  await connectDB();

  const sessionUser = await getSessonUser();
  if (!sessionUser) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return { count };
}

export default getUnreadMessageCount;
