import { ReactNode } from "react";
import "@/assets/styles/globals.css";
import { title } from "process";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <AuthProvider>
      <html>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
      <ToastContainer />
    </AuthProvider>
  );
};

export default MainLayout;
