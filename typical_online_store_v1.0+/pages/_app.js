import "../styles/globals.css";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
  // to ensure that the app is not remounted every time switching pages
  useEffect(() => {
    console.log("App Mounted");
  }, []);

  // consider using <layout></layout> to prevent remounting some stuff in the future

  return (
    <>
      <NavBar totalProducts={0} />
      <AnimatePresence initial={false} mode={"wait"}>
        <Component key={router.pathname} {...pageProps} />
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default MyApp;
