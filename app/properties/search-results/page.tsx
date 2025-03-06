import { PropertyDetailType } from "@/components/Interface/Properties";
import PropertyCard from "@/components/PropertyCard";
import PropertySeachForm from "@/components/PropertySeachForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

interface SearchParams {
  location: string;
  propertyType: string;
}

type QueryType = { $or: { [key: string]: RegExp }[]; type?: RegExp };

const SearchResultPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { location, propertyType } = await searchParams;

  await connectDB();
  const locationPattern = new RegExp(location, "i");

  const query: QueryType = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };

  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const propertyResult = await Property.find(query).lean();
  const properties = JSON.parse(JSON.stringify(propertyResult));

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySeachForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center mb-3 hover:underline"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" />
            Back to Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property: PropertyDetailType, index: number) => (
                <PropertyCard key={index} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultPage;
