import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineShoppingCart, AiOutlineHome } from "react-icons/ai";
import { CiLemon, CiLogin } from "react-icons/ci";
import { useState } from "react";

// import { cartHandler } from "../../pages/api/cartHandler";

export default function NavBar() {
  const [isOpen, toggleCollapse] = useState(false);
  // const [showCart, toggleCart] = useState(false);
  // const [state, setState] = useState({ cart: [] });

  // const checkCart = async () => {
  //   let cartContent = await cartHandler("GET");
  //   setState({ cart: cartContent });
  //   toggleCart(!showCart);
  // };

  return (
    <>
      <nav className="bg-green-600 border-gray-200 px-2 sm:px-4 py-2">
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
              <li>
                <Link
                  href="/"
                  className="block py-2 pr-4 pl-3 text-white hover:bg-green-400 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
                >
                  <AiOutlineHome className="inline-block text-xl mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="flex py-2 pr-4 pl-3 text-white hover:bg-green-400 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
                >
                  <CiLemon className="inline-block text-xl mr-2" />
                  Products
                </Link>
              </li>
              <li>
                {/* <div
                  onClick={() => checkCart()}
                  className="hidden cursor-pointer py-2 pr-4 pl-3 text-white hover:bg-green-400 border-b md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 md:flex"
                >
                  <AiOutlineShoppingCart className="inline-block text-xl mr-2" />
                  Cart
                </div> */}
                <Link
                  href="/cart"
                  className="flex py-2 pr-4 pl-3 text-white hover:bg-green-400 border-b md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
                >
                  <AiOutlineShoppingCart className="inline-block text-xl mr-2" />
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="block py-2 pr-4 pl-3 text-white hover:bg-green-400 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
                >
                  <CiLogin className="inline-block text-xl mr-2" />
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
