import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

type PropertiesPageProps = {
  params: {
    id: string;
  };
};

const PropertyPage = async ({ params }: PropertiesPageProps) => {
  const { id } = await params;
  await connectDB();
  const property = (await Property.findById(id).lean()) as unknown as {
    _id: string;
    beds: number;
    baths: number;
    square_feet: number;
    images?: string[];
  };

  return (
    <>
      <PropertyHeaderImage src={property?.images?.[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowAltCircleLeft className="mr-2" />
            Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyPage;
