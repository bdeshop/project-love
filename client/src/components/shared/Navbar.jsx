import PrimaryButton from "./PrimaryButton";
import { FiPlusCircle } from "react-icons/fi";
import { TfiReload } from "react-icons/tfi";
import { IoMdLogIn } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useContext, useState } from "react";
import { useGetHomeControlsQuery } from "@/redux/features/allApis/homeControlApi/homeControlApi";
import { useGetColorControlsQuery } from "@/redux/features/allApis/colorControlApi/colorControlApi";
import { AuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: homeControls } = useGetHomeControlsQuery();
  const { data: colorControls } = useGetColorControlsQuery();

  // ✅ AuthContext থেকে ইউজার নেওয়া
  const { user, reloadBalance, loading } = useContext(AuthContext);

  const logoControl = homeControls?.find(
    (control) => control.category === "logo" && control.isSelected
  );
  const navbarColorControl = colorControls?.find(
    (colorControl) => colorControl.section === "home-navbar"
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="fixed top-0 z-20 w-full md:w-[60%] lg:w-[40%] xl:w-[30%]">
      <div className="relative">
        {isSidebarOpen && (
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        )}

        <div
          style={{
            backgroundColor: navbarColorControl?.backgroundColor,
            color: navbarColorControl?.textColor,
            fontSize: navbarColorControl?.fontSize
              ? navbarColorControl?.fontSize
              : "14px",
          }}
          className="flex items-center justify-between px-3 py-2 "
        >
          {/* Left side */}
          <div className="flex flex-row items-center gap-2">
            {user && (
              <IoMenu
                className="text-black text-3xl cursor-pointer"
                onClick={toggleSidebar}
              />
            )}
            <Link to="/">
              <img
                className="w-[84px] h-[26px]"
                src={`${import.meta.env.VITE_BASE_API_URL}${logoControl?.image}`}
                alt="Logo"
              />
            </Link>
          </div>

          {/* Right side */}
          {user ? (
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col items-start">
                <p>@{user?.username}</p>
                <div className="flex flex-row items-center gap-1 text-sm">
                  <p>USD {user?.balance?.toFixed(2) || "0.00"}</p>
                  <p className="text-red-500">
                    <span className="font-semibold text-black">Exp</span> (0.00)
                  </p>
                </div>
              </div>
              <TfiReload
                onClick={reloadBalance}
                className={`text-lg ${loading && "animate-spin"}`}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <Link
                target="_blank"
                rel="noreferrer noopenner"
                to="https://agentlist.oracletechnology.net"
              >
                <PrimaryButton icon={FiPlusCircle} background={""}>
                  SignUp
                </PrimaryButton>
              </Link>
              <Link to="/login">
                <PrimaryButton icon={IoMdLogIn} background={"red"}>
                  Login
                </PrimaryButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
