import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  AiOutlineShoppingCart,
  AiOutlineHome,
  AiFillCaretDown,
  AiFillCaretUp,
} from "react-icons/ai";
import { CiLemon, CiLogin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { useRouter } from "next/router";

import { globalHandler } from "../../pages/api/globalHandler";
import ModalDropdown from "./modalDropdown";
import ModalConfirmation from "./modalConfirmation";

// import { cartHandler } from "../../pages/api/cartHandler";

export default function NavBar({ data }) {
  const navigations = [
    {
      name: "Home",
      logo: <AiOutlineHome className="inline-block text-xl mr-2" />,
      link: "/",
    },
    {
      name: "Products",
      logo: <CiLemon className="inline-block text-xl mr-2" />,
      link: "/products",
    },
    {
      name: "Cart",
      logo: <AiOutlineShoppingCart className="inline-block text-xl mr-2" />,
      link: "/cart",
    },
  ];

  const profileModalOptions = [
    {
      name: "Edit Profile",
      option: "edit-profile",
    },
    {
      name: "Logout",
      option: "logout",
    },
  ];

  const router = useRouter();

  const [isOpen, toggleCollapse] = useState(false);
  const [showProfileModal, toggleProfileModal] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(null);
  const [showLogoutModal, toggleShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    let globalValues = await globalHandler("GET");
    globalValues.loggedIn = false;
    globalValues.loggedUserId = 0;
    globalValues.loggedUserName = "";
    await globalHandler("PUT", globalValues);
    // this may need to be changed so when logging out at home page it shows a refresh page
    router.push({ pathname: "/" });
  };

  const handleViewProfile = () => {
    router.push({
      pathname: "/viewUser",
      query: { userId: data.loggedUserId },
    });
  };

  const handleProfileModal = (event) => {
    // gets the position of the clicked button/div
    const buttonRect = event.target.getBoundingClientRect();
    setButtonPosition({ top: buttonRect.bottom, left: buttonRect.left });
    toggleProfileModal(!showProfileModal);
  };

  const handleProfileModalOption = (option) => {
    if (option === "edit-profile") {
      handleViewProfile();
    } else if (option === "logout") {
      handleLogoutModal();
    }
    toggleProfileModal(!showProfileModal);
  };

  const handleLogoutModal = () => {
    toggleShowLogoutModal(!showLogoutModal);
  };

  const handleLogoutModalOption = (option) => {
    if (option === "logout") {
      handleLogout();
    }
    toggleShowLogoutModal(!showLogoutModal);
  };

  return (
    <>
      <nav className="bg-green-600 border-gray-200 p-2 sm:px-4 ">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className="flex">
            <span className="text-white self-center text-xl font-bold whitespace-nowrap dark:text-white">
              Typical Online Store
            </span>
          </Link>
          <div
            onClick={() => toggleCollapse(!isOpen)}
            className="cursor-pointer inline-flex items-center p-2 ml-3 text-lg text-white rounded-lg hover:bg-green-400 md:hidden"
          >
            <GiHamburgerMenu />
          </div>
          <div
            className={
              isOpen
                ? "w-full md:block md:w-auto"
                : "hidden w-full md:block md:w-auto"
            }
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-latoBold">
              {navigations.map((n) => (
                <li key={n.name}>
                  <Link
                    href={n.link}
                    className="block py-2 pr-4 pl-3 text-white hover:bg-green-400 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
                  >
                    {n.logo}
                    {n.name}
                  </Link>
                </li>
              ))}
              <li>
                {data.loggedIn === false ? (
                  <Link
                    href="/login"
                    className="block py-2 pr-4 pl-3 text-white hover:bg-green-400 md:hover:bg-transparent border-t md:border-0 md:hover:text-black md:p-0"
                  >
                    <CiLogin className="inline-block text-xl mr-2" />
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={handleProfileModal}
                    className="block py-2 pr-4 pl-3 text-white hover:bg-green-400 md:hover:bg-transparent border-t w-full text-left md:border-0 md:hover:text-black md:p-0"
                  >
                    <CgProfile className="inline-block text-xl mr-2" />
                    {data.loggedUserName}{" "}
                    {showProfileModal === false ? (
                      <AiFillCaretDown className="inline-block text-xl mr-2" />
                    ) : (
                      <AiFillCaretUp className="inline-block text-xl mr-2" />
                    )}
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* PROFILE MODAL SECTION */}
      <ModalDropdown
        show={showProfileModal}
        buttonPosition={buttonPosition}
        options={profileModalOptions}
        handleOptions={handleProfileModalOption}
      ></ModalDropdown>

      {/* LOGOUT MODAL SECTION */}
      <ModalConfirmation
        show={showLogoutModal}
        shortMessage="Are you sure you want to logout?"
        rejectOption="cancel"
        acceptOption="logout"
        handleOptions={handleLogoutModalOption}
      ></ModalConfirmation>
    </>
  );
}
