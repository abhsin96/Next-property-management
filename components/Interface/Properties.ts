export type PropertyDetailType = {
  _id: string;
  owner?: string;
  name?: string;
  type?: string;
  description?: string;
  location?: {
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
  };
  beds: Number;
  baths: Number;
  square_feet: Number;
  amenities?: string[];
  rates?: {
    nightly?: number;
    weekly?: number;
    monthly?: number;
  };
  seller_info?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  images?: string[] | undefined;
  is_featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
