import { useRouter } from "next/router";
import { motion as m } from "framer-motion";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <m.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
      className="h-screen flex items-center justify-center"
    >
      <div className="bg-white rounded-lg w-1/2 font-latoregular text-gray-700 p-16">
        <h1 className="text-3xl pb-4 font-latoBold">Thanks for signing up!</h1>
        <h3 className="text-lg text-gray-500">
          Here are the data that we received:
          <h6>{router.query.username}</h6>
          <h6>{router.query.password}</h6>
          <h6>{router.query.email}</h6>
          <h6>{router.query.country}</h6>
          <h6>{router.query.terms}</h6>
          <h6>{router.query.newsletter}</h6>
        </h3>
      </div>
    </m.main>
  );
}
