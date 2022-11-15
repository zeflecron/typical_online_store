import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { motion as m } from "framer-motion";

export default function LoginPage() {
  // router
  const router = useRouter();

  // formik logics
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      country: "Select a country...",
      terms: false,
      newsletter: false,
    },

    // validate form
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, "Username must be 4 characters or more")
        .max(20, "Username must be 20 characters or less")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      country: Yup.string()
        .oneOf(["Germany", "United Kingdom", "Netherlands", "Australia"])
        .required("Please select a country"),
      terms: Yup.boolean().oneOf([true], "Terms of service must be checked"),
    }),

    // submit form
    onSubmit: (values) => {
      console.log(values);
      router.push({ pathname: "/success", query: values });
    },
  });

  console.log(formik.errors);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute w-full"
    >
      <main className="h-screen flex items-center justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white flex rounded-lg font-latoregular max-w-md"
        >
          <div className="flex-1 text-gray-700 p-14">
            <h1 className="text-3xl pb-2 font-latoBold">
              Start Ordering Today!
            </h1>
            <p>Join us to start ordering healthy products!</p>
            <div className="mt-6">
              {/* Username input field */}
              <div className="pb-4">
                <label
                  className="block font-latoBold text-sm pb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-emerald-500 focus:ring-emerald-500"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                <p className="block font-latoBold text-sm pt-2 text-red-500">
                  {formik.touched.username && formik.errors.username
                    ? formik.errors.username
                    : ""}
                </p>
              </div>
              {/* Email input field */}
              <div className="pb-4">
                <label
                  className="block font-latoBold text-sm pb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-emerald-500 focus:ring-emerald-500"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                <p className="block font-latoBold text-sm pt-2 text-red-500">
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""}
                </p>
              </div>
              {/* Country input field */}
              <div className="pb-4">
                <label
                  className="block font-latoBold text-sm pb-2"
                  htmlFor="country"
                >
                  Country
                </label>
                <select
                  name="country"
                  className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-emerald-500 focus:ring-emerald-500"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option>Select a country...</option>
                  <option>Germany</option>
                  <option>United Kingdom</option>
                  <option>Netherlands</option>
                  <option>Australia</option>
                </select>
                <p className="block font-latoBold text-sm pt-2 text-red-500">
                  {formik.touched.country && formik.errors.country
                    ? "Please select a country"
                    : ""}
                </p>
              </div>
              {/* Terms of Service field */}
              <div className="pb-4">
                <label
                  className="block font-latoBold text-sm pb-2"
                  htmlFor="terms"
                >
                  Terms of service
                </label>
                <div className="flex items-center gap-2 pb-2">
                  <input
                    type="checkbox"
                    name="terms"
                    value="checked"
                    className="h-5 w-5 text-emerald-500 border-2 focus:border-emerald-500 focus:ring-emerald-500"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p className="text-sm font-latoLight text-gray-500 break-normal">
                    I agree that data from purchases can be used to analyze
                    performances of certain products and use them to offer more
                    desirable products in the future
                  </p>
                </div>
                <label
                  className="block font-latoBold text-sm pb-2"
                  htmlFor="newsletter"
                >
                  Newsletter
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="newsletter"
                    value="checked"
                    className="h-5 w-5 text-emerald-500 border-2 focus:border-emerald-500 focus:ring-emerald-500"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p className="text-sm font-latoLight text-gray-500 break-normal">
                    I want to receive future products and promotion in my e-mail
                    (this can be cancelled at any time)
                  </p>
                </div>
                <p className="block font-latoBold text-sm pt-2 text-red-500">
                  {formik.touched.terms && formik.errors.terms
                    ? formik.errors.terms
                    : ""}
                </p>
              </div>
              <button
                type="submit"
                className="bg-emerald-500 font-latoBold text-sm text-white py-3 mt-6 rounded-lg w-full"
              >
                Click me!
              </button>
            </div>
          </div>
        </form>
      </main>
    </m.div>
  );
}
