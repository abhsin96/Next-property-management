"use client";

import deleteMessage from "@/app/actions/deleteMessage";
import markReadStatus from "@/app/actions/updateMessageStatus";
import { useGlobalContext } from "@/context/GlobalContext";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const MessageCard = ({ message }: any) => {
  const { setUnreadCount } = useGlobalContext();
  const date = useMemo(
    () => new Date(message.createdAt).toLocaleString(),
    [message.createdAt]
  );

  const [isRead, setIsRead] = useState(message.read);

  const handleMessageReadClick = async () => {
    const read = await markReadStatus(message._id);
    setIsRead(read);
    toast.success(
      `${message.property.name} marked as ${read ? "Read" : "New"}`
    );
    setUnreadCount((prev) => (read ? prev - 1 : prev + 1));
  };

  const handleDeleteMessage = async () => {
    const res = await deleteMessage(message._id);
    if (!message.read) setUnreadCount((prev) => prev - 1);
    toast.success("Message deleted");
  };
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded">
          New{" "}
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry :</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Reply Email :</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone :</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received :</strong> {date}
        </li>
      </ul>
      <button
        onClick={handleMessageReadClick}
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
      >
        Mark As {isRead ? "New" : "Read"}
      </button>
      <button
        onClick={handleDeleteMessage}
        className="mt-4  bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
