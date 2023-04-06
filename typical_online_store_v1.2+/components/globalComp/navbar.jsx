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

import Modal from "./modal";
import { globalHandler } from "../../pages/api/globalHandler";

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

  const handleClose = () => {
    setShowModal(false);
  };

  // const [showCart, toggleCart] = useState(false);
  // const [state, setState] = useState({ cart: [] });

  // const checkCart = async () => {
  //   let cartContent = await cartHandler("GET");
  //   setState({ cart: cartContent });
  //   toggleCart(!showCart);
  // };

  const handleLogout = async () => {
    let globalValues = await globalHandler("GET");
    globalValues.loggedIn = false;
    globalValues.loggedUserId = 0;
    globalValues.loggedUserName = "";
    await globalHandler("PUT", globalValues);
    // this may need to be changed so when logging out at home page it shows a refresh page
    router.push({ pathname: "/" });
  };

  const handleProfileModal = (event) => {
    // gets the position of the clicked button/div
    const buttonRect = event.target.getBoundingClientRect();
    setButtonPosition({ top: buttonRect.bottom, left: buttonRect.left });
    toggleProfileModal(!showProfileModal);
  };

  const handleProfileModalOption = (option) => {
    if (option === "edit-profile") {
      // WIP
      console.log("edit");
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
              {/* <div
                  onClick={() => checkCart()}
                  className="hidden cursor-pointer py-2 pr-4 pl-3 text-white hover:bg-green-400 border-b md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 md:flex"
                >
                  <AiOutlineShoppingCart className="inline-block text-xl mr-2" />
                  Cart
                </div> */}
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
      {showProfileModal && (
        <Modal
          type="dropdown"
          buttonPosition={buttonPosition}
          show={showProfileModal}
        >
          <ul>
            {profileModalOptions.map((p) => (
              <li
                key={p.name}
                className="px-4 py-2 hover:bg-gray-300 hover:cursor-pointer"
                onClick={() => handleProfileModalOption(p.option)}
              >
                {p.name}
              </li>
            ))}
          </ul>
        </Modal>
      )}

      {/* LOGOUT MODAL SECTION */}
      {showLogoutModal && (
        <Modal type="fullscreen" show={showLogoutModal}>
          <p className="p-4 font-latoBold">Are you sure you want to logout?</p>
          <div className="flex justify-between">
            <button
              className="p-2 bg-red-500 hover:bg-red-400 text-white text-lg border-b-4 border-red-700 hover:border-red-500 rounded"
              onClick={() => handleLogoutModalOption("cancel")}
            >
              Cancel
            </button>
            <button
              className="flex p-2 bg-teal-500 hover:bg-teal-400 text-white text-lg border-b-4 border-teal-700 hover:border-teal-500 rounded"
              onClick={() => handleLogoutModalOption("logout")}
            >
              Logout
            </button>
          </div>
        </Modal>
      )}

      {/* UNUSED SEGMENT FOR MODAL BOX CART */}
      {/* {showCart && (
        <div className="absolute z-10 right-10 bg-white rounded-lg w-80">
          <p>
            yes, you need to close and reopen this to see the cart change... for
            now
          </p>
          {state.cart.map((cartContent) => (
            <>
              <li>hello</li>
              <li>{cartContent.name}</li>
              <li>{cartContent.quantity}</li>
            </>
          ))}
        </div>
      )} */}
    </>
  );
}
