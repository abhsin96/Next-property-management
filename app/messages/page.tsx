import MessageCard from "@/components/MessageCard";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessonUser } from "@/utils/getSessonUser";

const MessagePage = async () => {
  await connectDB();
  const session = await getSessonUser();

  const readMessage = JSON.parse(
    JSON.stringify(
      await Message.find({
        recipient: session?.userId,
        read: true,
      })
        .sort({ createdAt: -1 })
        .populate("sender", "username")
        .populate("property", "name")
        .lean()
    )
  );

  const unreadMessage = JSON.parse(
    JSON.stringify(
      await Message.find({
        recipient: session?.userId,
        read: false,
      })
        .sort({ createdAt: -1 })
        .populate("sender", "username")
        .populate("property", "name")
        .lean()
    )
  );

  const messages = [...unreadMessage, ...readMessage];
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-4 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md  m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {messages?.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagePage;
