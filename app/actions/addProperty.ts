"use server";

import cloudinary from "@/config/cloudnary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessonUser } from "@/utils/getSessonUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function addProperty(formData: any) {
  await connectDB();

  const sessionUser = await getSessonUser();
  if (!sessionUser) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const amenities = formData.getAll("amenities");
  const images = formData
    .getAll("images")
    .filter((image: any) => image.name !== "");
  console.log("type", formData.get("type"));
  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
      nightly: formData.get("rates.nightly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
    images: [] as string[],
  };
  const imageUrls: string[] = [];

  for (const imageFile of images) {
    const imagebuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imagebuffer));
    const imageBase64 = Buffer.from(imageArray).toString("base64");
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: "propertypulse",
      }
    );

    imageUrls.push(result.secure_url);
  }
  propertyData.images = imageUrls;
  console.log("propertyData", propertyData);
  const newProperty = new Property(propertyData);
  const res = await newProperty.save();
  console.log("res", res);
  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
