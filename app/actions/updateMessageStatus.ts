"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessonUser } from "@/utils/getSessonUser";
import { revalidatePath } from "next/cache";

async function markReadStatus(messageId: string) {
  await connectDB();

  const sessionUser = await getSessonUser();
  if (!sessionUser) {
    throw new Error("User ID is required");
  }

  const message = await Message.findById(messageId);

  message.read = !message.read;

  revalidatePath("/messages", "page");

  await message.save();

  return message.read;
}

export default markReadStatus;
