import "../styles/globals.css";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import NavBar from "../components/globalComp/navbar";
import Footer from "../components/globalComp/footer";
import { globalHandler } from "./api/globalHandler";

function MyApp({ Component, pageProps, router, navbarData }) {
  // to ensure that the app is not remounted every time switching pages
  useEffect(() => {
    console.log("App Mounted");
  }, []);

  // consider using <layout></layout> to prevent remounting some stuff in the future

  return (
    <>
      <NavBar data={navbarData} />
      <AnimatePresence initial={false} mode={"wait"}>
        <Component key={router.pathname} {...pageProps} />
      </AnimatePresence>
      <Footer />
    </>
  );
}

MyApp.getInitialProps = async () => {
  const navbarDataRes = await globalHandler("GET");

  return {
    navbarData: navbarDataRes,
  };
};

export default MyApp;
