import { ReactNode } from "react";
import "@/assets/styles/globals.css";
import { title } from "process";

export const metadata = {
  title: "Property Management",
  description: "Property Management System",
  keywords: "property, management, system",
};

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
