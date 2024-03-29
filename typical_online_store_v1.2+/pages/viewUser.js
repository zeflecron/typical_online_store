import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { motion as m } from "framer-motion";

import { userHandler } from "./api/userHandler";
import { globalHandler } from "./api/globalHandler";
import ModalConfirmation from "../components/globalComp/modalConfirmation";

export default function ViewUserPage({ user, currentUser }) {
  const [showDeleteModal, toggleShowDeleteModal] = useState(false);
  const router = useRouter();
  // possibly overcomplexified
  // idea is to read the entire json object so it is not needed to type in every key manually
  // issue is, the keys do not begin with capital letters
  // but fixing that first issue causes another
  // which is keys' value require lowercase letters because no keys start with capital letters
  // better solution, to just filter them out before hand
  // and then capitalize afterwards
  // FUTURE PLANS: allow the user to set profile to private/friends/public

  // select keys to exclude
  const excludeUserKeys = ["id", "email", "password", "terms"];

  // in reduce, the typeof === "boolean"
  // is used so that boolean values will be displayed as a string of "no" or "yes"
  // this is done because maping it will not display anything due to it being a boolean value
  const filteredUserData = Object.keys(user)
    .filter((key) => !excludeUserKeys.includes(key))
    .reduce((obj, key) => {
      typeof user[key] === "boolean"
        ? user[key]
          ? (obj[key] = "Yes")
          : (obj[key] = "No")
        : (obj[key] = user[key]);
      return obj;
    }, {});

  // capitalize all the keys so when displaying it, nothing needs to be changed
  const capitalizedUserKeys = Object.keys(filteredUserData)
    .map((key) => key.charAt(0).toUpperCase() + key.slice(1))
    .reduce((obj, key) => {
      obj[key] = filteredUserData[key.toLowerCase()];
      return obj;
    }, {});

  const handleDeleteProfile = () => {
    console.log(currentUser);
  };

  const handleEditProfile = () => {
    router.push({
      pathname: "/editUser",
      query: { userId: currentUser },
    });
  };

  const handleDeleteModal = () => {
    toggleShowDeleteModal(!showDeleteModal);
  };

  const handleDeleteModalOption = (option) => {
    if (option === "delete") {
      handleDeleteProfile();
    }
    toggleShowDeleteModal(!showDeleteModal);
  };

  return (
    <>
      <Head>
        <title>Typical Online Store - User - {user.username}</title>
        <meta name="online store" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <m.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
        className="font-latoRegular min-h-screen"
      >
        <section className="bg-white p-4 m-4 lg:w-3/4 lg:mx-auto">
          <div>
            {/* does not display unneccesarry/private data */}
            {/* seems stupid for something small, but it will be expanded... */}
            {Object.keys(capitalizedUserKeys).map((key) => (
              <div key={key} className="flex">
                <span className="flex-none w-24 block p-2 m-2 text-xl">
                  {key}
                </span>
                <span className="flex-1 block p-2 m-2 text-xl">
                  : {capitalizedUserKeys[key]}
                </span>
              </div>
            ))}
          </div>

          {/* only allow the logged user to edit its own profile */}
          {user.id === currentUser && (
            <div className="flex justify-between">
              <button
                className="flex p-4 font-latoBold bg-red-500 hover:bg-red-400 text-white text-lg border-b-4 border-red-700 hover:border-red-500 rounded"
                onClick={() => handleDeleteModal()}
              >
                Delete Account
              </button>
              <button
                className="flex p-4 font-latoBold bg-teal-500 hover:bg-teal-400 text-white text-lg border-b-4 border-teal-700 hover:border-teal-500 rounded"
                onClick={() => handleEditProfile(user.id)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </section>

        {/* LOGOUT MODAL SECTION */}
        <ModalConfirmation
          show={showDeleteModal}
          shortMessage="Are you sure you want to delete this account?"
          rejectOption="cancel"
          acceptOption="delete"
          handleOptions={handleDeleteModalOption}
        ></ModalConfirmation>
      </m.main>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const { query } = ctx;
    // console.log(query);
    // prevents user to go to this page without the router data
    // also this if statement checks if query is empty or not
    if (Object.keys(query).length === 0 || query.userId === undefined) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else {
      const userData = await userHandler("GET", "None", query.userId);
      const globalValues = await globalHandler("GET");
      return {
        props: {
          user: userData,
          currentUser: globalValues.loggedUserId,
        },
      };
    }
  } catch (err) {
    console.log("an error");
    return {
      notFound: true,
    };
  }
};
