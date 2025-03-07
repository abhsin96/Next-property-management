import { ReactNode } from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "@/context/GlobalContext";

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
      <GlobalProvider>
        <>
          <html>
            <body>
              <Navbar />

              <main>{children}</main>
              <Footer />
            </body>
          </html>
          <ToastContainer />
        </>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;
