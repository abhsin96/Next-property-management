"use client";

import bookmarkProperty from "@/app/actions/bookmarkProperty";
import isPropertyBookmarked from "@/app/actions/isBookmarked";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const BookmarkButton = ({ property }: any) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    if (!userId) {
      toast.error("You must be logged in to bookmark a property");
      return;
    }
    const res = await bookmarkProperty(property?._id);

    toast.success(res.message);
    setIsBookmarked(res.isBookmarked);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    isPropertyBookmarked(property._id)
      .then((res) => {
        setIsBookmarked(res);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <button
      onClick={handleClick}
      className={`bg-${isBookmarked ? "red" : "blue"}-500 hover:bg-${
        isBookmarked ? "red" : "blue"
      }-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center gap-2`}
    >
      {loading ? (
        <ClipLoader
          cssOverride={{
            display: "block",
            borderColor: "green",
            height: 24,
            width: 24,
          }}
        />
      ) : (
        <>
          <FaBookmark />
          {isBookmarked ? "Remove Bookmark" : " Bookmark Property"}
        </>
      )}
    </button>
  );
};

export default BookmarkButton;
