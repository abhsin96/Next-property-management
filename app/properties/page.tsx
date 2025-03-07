import Pagination from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

interface SearchParam {
  page?: number;
  pageSize?: number;
}

const PropertiesPage = async ({
  searchParams,
}: {
  searchParams: SearchParam;
}) => {
  const { page = 1, pageSize = 9 } = await searchParams;

  await connectDB();
  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments();
  const properties = await Property.find({}).skip(skip).limit(pageSize).lean();

  const showPaginatino = total > pageSize;
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          "No properties found"
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
        )}
      </div>
      {showPaginatino && (
        <Pagination page={page} pageSize={pageSize} total={total} />
      )}
    </section>
  );
};

export default PropertiesPage;
