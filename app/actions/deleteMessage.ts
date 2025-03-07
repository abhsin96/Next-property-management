"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessonUser } from "@/utils/getSessonUser";
import { revalidatePath } from "next/cache";

const deleteMessage = async (messageId: string): Promise<void> => {
  try {
    const sessionUser = await getSessonUser();

    if (!sessionUser?.userId) {
      throw new Error("User ID is required");
    }

    await connectDB();
    const message = await Message.findById(messageId);

    if (!message) {
      throw new Error("Message not found");
    }

    if (message.recipient.toString() !== sessionUser.userId) {
      throw new Error("You are not authorized to delete this message");
    }

    await Message.deleteOne({ _id: messageId });

    revalidatePath("/messages", "page");
  } catch (error) {
    console.error(error);
  }
};

export default deleteMessage;
