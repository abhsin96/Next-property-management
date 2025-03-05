import { model, models, Schema } from "mongoose";

const LocationSchema: Schema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },
});

const RatesSchema: Schema = new Schema({
  nightly: { type: Number },
  weekly: { type: Number },
  monthly: { type: Number },
});

const SellerInfoSchema: Schema = new Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
});

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: { type: LocationSchema },
    beds: { type: Number, required: true },
    baths: { type: Number, required: true },
    square_feet: { type: Number, required: true },
    amenities: [{ type: String }],
    rates: { type: RatesSchema },
    seller_info: { type: SellerInfoSchema },
    images: [{ type: String }],
    is_featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Property = models.Property || model("Property", PropertySchema);

export default Property;
