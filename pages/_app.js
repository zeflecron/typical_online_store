import "../styles/globals.css";
import NavBar from "../components/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar totalProducts={0} />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
