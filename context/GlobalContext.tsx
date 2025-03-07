"use client";
import getUnreadMessageCount from "@/app/actions/getMessageCount";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface GlobalContextProps {
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

const GlobalContext = createContext<GlobalContextProps>({
  unreadCount: 0,
  setUnreadCount: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const { data: session } = useSession();

  const fetchCount = async () => {
    const res = await getUnreadMessageCount();
    setUnreadCount(res.count);
  };

  useEffect(() => {
    if (session && session.user) {
      fetchCount();
    }
  }, [session]);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}
