import Link from "next/link";
import PropertyCard from "./PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const HomeProperties = async () => {
  await connectDB();

  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();
  return (
    <>
      <section className="px-4 py-6">
        <h2 className="text-3xl font-bold text-blue-500 text-center mb-6">
          Recent Properties
        </h2>
        <div className="container-xl lg:container m-auto px-4 py-6">
          {recentProperties.length === 0 ? (
            "No properties found"
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentProperties.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
