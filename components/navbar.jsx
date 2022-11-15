import Link from "next/link";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";

const NavBar = ({ totalProducts }) => {
  const [isOpen, toggleCollapse] = useState(false);

  return (
    <nav className="bg-green-600 border-gray-200 px-2 sm:px-4 py-2">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/" className="flex">
          <span className="text-white self-center text-xl font-bold whitespace-nowrap dark:text-white">
            Typical E-commerce
          </span>
        </Link>
        <div
          onClick={() => toggleCollapse(!isOpen)}
          className="cursor-pointer inline-flex items-center p-2 ml-3 text-lg text-white rounded-lg md:hidden hover:bg-green-400"
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
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link
                href="/"
                className="block py-2 pr-4 pl-3 text-white hover:bg-green-400 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="block py-2 pr-4 pl-3 text-white hover:bg-green-400 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex flex-row py-2 pr-4 pl-3 text-white hover:bg-green-400 border-b md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
              >
                <AiOutlineShoppingCart className="text-xl mr-2" /> Total $
                {totalProducts}
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="block py-2 pr-4 pl-3 text-white hover:bg-green-400 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
              >
                Login/Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
