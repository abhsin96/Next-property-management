import EditForm from "@/components/EditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import React from "react";

const EditPage = async ({ params }: { params: { id: string } }) => {
  await connectDB();
  const { id } = await params;
  const property = (await Property.findById(id).lean()) as unknown as {
    _id: string;
    beds: number;
    baths: number;
    square_feet: number;
    images?: string[];
  };

  if (!property) {
    return (
      <div className="text-center text-2xl font-bold mt-10">
        Property not found
      </div>
    );
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <EditForm property={JSON.parse(JSON.stringify(property))} />
        </div>
      </div>
    </section>
  );
};

export default EditPage;
