import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            title="For Renters"
            description=" Find your dream rental property. Bookmark properties and contact
              owners."
            route="/properties"
            linkText="Browse Properties"
          />
          <InfoBox
            title="For Property Owners"
            description="List your properties and reach potential tenants. Rent as an
              airbnb or long term."
            route="/properties/add"
            linkText="Add Property"
            backgroundColor="bg-blue-100"
            buttonColor="bg-blue-500"
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
