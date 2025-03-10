"use client";
import { useSession } from "next-auth/react";
import { PropertyDetailType } from "./Interface/Properties";
import addMessage from "@/app/actions/addMessage";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import SubmitButton from "./SubmitButton";

const PropertyContactForm = ({
  property,
}: {
  property: PropertyDetailType;
}) => {
  const { data: session } = useSession();

  const [state, formAction] = useActionState(addMessage, {
    data: [],
    error: { message: "" },
    message: "",
    submitted: false,
  });
  useEffect(() => {
    if (state.error?.message) {
      toast.error(state.error.message);
    }
    if (state.message) toast.success(state.message);
  }, [state]);

  if (state.submitted) {
    return <p className="text-green-500 mb-4">Your message has been sent</p>;
  }

  if (!session) {
    return;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      <form action={formAction}>
        <input type="hidden" name="property" defaultValue={property?._id} />
        <input type="hidden" name="recipient" defaultValue={property?.owner} />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
            id="message"
            name="message"
            placeholder="Enter your message"
          ></textarea>
        </div>
        <div>
          <SubmitButton text="Send Message" pendingText="Sending" />
        </div>
      </form>
    </div>
  );
};

export default PropertyContactForm;
