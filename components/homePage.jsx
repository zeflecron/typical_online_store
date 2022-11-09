import Image from "next/image";
import NavBar from "./navbar";
import home_img_0 from "../public/home/home_img_0.jpg";
import home_img_1 from "../public/home/home_img_1.jpg";
import home_img_2 from "../public/home/home_img_2.jpg";
import home_img_3 from "../public/home/home_img_3.jpg";

// images from (not in order):
// https://unsplash.com/@alienowicz
// https://unsplash.com/@iconquistador
// https://unsplash.com/@dancristianpaduret
// https://unsplash.com/@randyfath

const HomePage = () => {
  return (
    <div>
      <NavBar totalProducts={0} />
      <main>
        <section>
          <h2 className="text-4xl p-4 text-center text-orange-400 xl:text-6xl">
            Typical Online Store
          </h2>
          <p className="text-xl p-4 text-center xl:text-2xl">
            The very very totally extremely most typical online store out there,
            selling
            <span className="text-green-500"> FRESH </span>fruits and
            vegetables!
          </p>
          <Image
            src={home_img_0}
            className="mx-auto object-cover h-64 w-64 rounded-full border-2 border-green-400 xl:h-96 xl:w-96"
            alt="home_img_0"
          />
        </section>
        <section>
          <h3 className="text-2xl p-4 text-center xl:text-4xl">Services</h3>
          <div className="lg:flex 2xl:mx-48">
            <div className="text-center shadow-xl rounded-xl m-6 border-2 border-lime-500">
              <Image
                src={home_img_1}
                className="mx-auto object-cover w-full h-48 rounded-t-xl"
                alt="home_img_1"
              />
              <p className="text-md p-2 leading-10 text-gray-800 xl:text-lg xl:leading-10">
                Fresh out of the farm and sold directly within 24 hours! Fewer
                preservatives than the average fruits and vegetables out there!
              </p>
            </div>
            <div className="text-center shadow-xl rounded-xl m-6 border-2 border-lime-500">
              <Image
                src={home_img_2}
                className="mx-auto object-cover w-full h-48 rounded-t-xl"
                alt="home_img_2"
              />
              <p className="text-md p-2 leading-10 text-gray-800 xl:text-lg xl:leading-10">
                Cleaned thoroughly before being delivered to everyone! Refunds
                available when product is not in a good condition!
              </p>
            </div>
            <div className="text-center shadow-xl rounded-xl m-6 border-2 border-lime-500">
              <Image
                src={home_img_3}
                className="mx-auto object-cover w-full h-48 rounded-t-xl"
                alt="home_img_3"
              />
              <p className="text-md p-2 leading-10 text-gray-800 xl:text-lg xl:leading-10">
                Bundles and discounts on certain days and events! Also doing
                charity work helping others in need when times are rough!
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
