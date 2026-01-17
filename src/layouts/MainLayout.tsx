import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { User } from "firebase/auth";

interface MainLayoutProps {
  user: User | null;
}

const MainLayout: React.FC<MainLayoutProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0F19] font-sans">
      <Navbar
        user={user}
        onLogoClick={() => navigate("/")}
        onClick={() => navigate("/")}
      />

      {/* Page content */}
      <Outlet />

      <Footer />
    </div>
  );
};

export default MainLayout;
