import "../styles/globals.css";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  // to ensure that the app is not remounted every time switching pages
  useEffect(() => {
    console.log("App Mounted");
  }, []);

  // consider using <layout></layout> to prevent remounting some stuff in the future

  return (
    <>
      <NavBar totalProducts={0} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
