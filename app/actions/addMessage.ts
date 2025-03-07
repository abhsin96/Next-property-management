"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessonUser } from "@/utils/getSessonUser";

async function addMessage(
  previousState: any,
  formData: { [key: string]: any }
) {
  await connectDB();

  const sessionUser = await getSessonUser();
  if (!sessionUser) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const recipient = formData.get("recipient");
  console.log("recipient", recipient, "userId", userId);
  if (userId === recipient) {
    return {
      data: [],
      error: {
        message: "You can't send message, property belong to you",
      },
      submitted: false,
    };
  }

  const propertyData = {
    sender: userId,
    recipient: recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  };

  const newMessage = new Message(propertyData);
  const res = await newMessage.save();
  console.log("res", res);
  return {
    data: res,
    message: "Message send successfully",
    error: {
      message: "",
    },
    submitted: true,
  };
}

export default addMessage;
