"use server";
import cloudinary from "@/config/cloudnary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessonUser } from "@/utils/getSessonUser";
import { revalidatePath } from "next/cache";

const deleteProperty = async (propertyId: string): Promise<void> => {
  try {
    const sessionUser = await getSessonUser();

    if (!sessionUser?.userId) {
      throw new Error("User ID is required");
    }

    await connectDB();
    const property = await Property.findById(propertyId);

    if (!property) {
      throw new Error("Property not found");
    }

    if (property.owner.toString() !== sessionUser.userId) {
      throw new Error("You are not authorized to delete this property");
    }

    const publicIds = property.images.map((imageUrl: string) => {
      const urlParts = imageUrl.split("/");
      const publicId = urlParts.at(-1)?.split(".")[0] ?? "";
      return publicId;
    });

    if (publicIds.length > 0) {
      for (const publicId of publicIds) {
        await cloudinary.uploader.destroy("propertypulse/" + publicId);
      }
    }

    await Property.deleteOne({ _id: propertyId });

    revalidatePath("/", "layout");
  } catch (error) {
    console.error(error);
  }
};

export default deleteProperty;
