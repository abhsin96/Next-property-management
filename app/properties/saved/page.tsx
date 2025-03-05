import { PropertyDetailType } from "@/components/Interface/Properties";
import PropertyCard from "@/components/PropertyCard";
import User from "@/models/User";
import { getSessonUser } from "@/utils/getSessonUser";

const SavedPropertyPage = async () => {
  const sessionUser = await getSessonUser();
  const userId = sessionUser?.user?.id;

  const { bookmarks } = await User.findById(userId).populate("bookmarks");
  return (
    <section className="px-4 py-6 min-h-svh">
      <div className="container lg:container m-auto px-4 py-6">
        <h2 className="text-2xl mb-4">Bookmarked Properties</h2>
        {bookmarks.length === 0 ? (
          <p>No saved property</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property: PropertyDetailType, index: number) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertyPage;
