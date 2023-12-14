import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faVenusMars,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRegisterUserMutation } from "../../feature/auth/authApiSlice.ts";
import { ToastContainer, toast } from "react-toastify";

// Define Yup schema for form validation
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  gender: Yup.string().required("Gender is required"),
});

const Register = () => {
  // call api
  const [registerUser] = useRegisterUserMutation();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "Undefined",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // Handle form submission logic
      const result = await registerUser(values);
      
      if ("data" in result) {
        resetForm();
        toast.success(result.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
      if ("error" in result) {
        toast.error(result.error.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConPasswordVisibility = () => {
    setShowConPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 relative">
            <label htmlFor="name" className="hidden">
              Name
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500"
              />
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="pl-10 pr-4 py-2 w-full border outline-none rounded-md focus:ring focus:border-[#339CCB]"
                placeholder="Enter your name"
              />
            </div>
            {formik.errors.name && formik.touched.name && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="email" className="hidden">
              Email
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500"
              />
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="pl-10 pr-4 py-2 w-full border outline-none rounded-md focus:ring focus:border-[#339CCB]"
                placeholder="Enter your email"
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="hidden">
              Password
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500"
              />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="pl-10 pr-4 py-2 w-full border rounded-md outline-none focus:ring focus:border-[#339CCB]"
                placeholder="Enter your password"
              />
              <span
                className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </span>
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="confirmPassword" className="hidden">
              Confirm Password
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500"
              />
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="pl-10 pr-4 py-2 w-full border rounded-md outline-none focus:ring focus:border-[#339CCB]"
                placeholder="Confirm your password"
              />
              <span
                className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500 cursor-pointer"
                onClick={toggleConPasswordVisibility}
              >
                {showConPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </span>
            </div>
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="gender" className="hidden">
              Gender
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faVenusMars}
                className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500"
              />
              <select
                id="gender"
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring outline-none focus:border-[#339CCB]"
              >
                <option value="Undefined">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            {formik.errors.gender && formik.touched.gender && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.gender}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#339CCB] hover:bg-[#53BD70] text-white font-bold rounded-md transition-all mt-6"
          >
            Register
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#339CCB] hover:text-[#53BD70]">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
