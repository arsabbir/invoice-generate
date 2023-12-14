import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginUserMutation } from "../../feature/auth/authApiSlice.ts";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  //
  const [loginUser, { error, message, data, isError, isLoading, isSuccess }] =
    useLoginUserMutation();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Define Yup schema for form validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await loginUser(values).unwrap();
      console.log(result);
      
      navigate("/")
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={formik.handleSubmit} className="sm:w-full">
          <div className="mb-4 relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 sr-only"
            >
              Email
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500"
              />
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`pl-10 pr-4 py-2 w-full border rounded-md outline-none focus:ring ${
                  formik.errors.email && formik.touched.email
                    ? "focus:border-red-500"
                    : "focus:border-primary"
                }`}
                placeholder="Email"
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 sr-only"
            >
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
                className={`pl-10 pr-4 py-2 w-full border rounded-md outline-none focus:ring ${
                  formik.errors.password && formik.touched.password
                    ? "focus:border-red-500"
                    : "focus:border-primary"
                }`}
                placeholder="Password"
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
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#339CCB] hover:bg-[#53BD70] text-white font-bold rounded-md transition-all mt-6"
          >
            Sign In
          </button>
          <div className="mt-4 text-center">
            <Link to="/register" className="text-gray-600 ">
              Don't have an account?{" "}
              <span className="hover:text-[#339CCB]">Sign up</span>
            </Link>
          </div>
          <div className="mt-2 text-center">
            <a href="#" className="text-gray-600 hover:text-primary">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
