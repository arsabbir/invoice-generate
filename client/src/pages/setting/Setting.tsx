import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import {
  useCreateSettingMutation,
  useGetSettingQuery,
  useUpdateSettingMutation,
} from "../../feature/setting/settingApiSlice.ts";
import { useLocation, useNavigate } from "react-router-dom";

interface FormValues {
  logo: File | string;
  favicon: string;
  title: string;
  brandName: string;
}

const validationSchema = Yup.object({
  logo: Yup.string(), // Adjust validation for logo
  favicon: Yup.string(),
  title: Yup.string(),
});

const Setting: React.FC = () => {
  const [createSetting, { error: createError }] = useCreateSettingMutation();
  const [
    updateSetting,
    { error: updateError, isError: isUpdateError, isSuccess: isUpdateSuccess },
  ] = useUpdateSettingMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const getSettingId = location.pathname.split("/")[2];
  console.log(
    updateError,
    isUpdateError,
    isUpdateSuccess,
    "updateSEtting err "
  );

  const {
    data: getAllData,
    error: getAllError,
    isLoading: isGetAllLoading,
  } = useGetSettingQuery("");
  // get edit data
  const editData =
    getAllData && getAllData.find((data) => data._id === getSettingId);

  // declare inisialization
  const initialValues: FormValues = {
    logo: "",
    favicon: editData?.favicon || "",
    title: editData?.title || "",
    brandName: editData?.brandName || "",
  };
  // onsubmit
  const onSubmit = async (values: FormValues, { resetForm }: any) => {
    const formData = new FormData();
    formData.append("logo", values.logo || "");
    formData.append("title", values.title);
    formData.append("favicon", values.favicon);
    formData.append("brandName", values.brandName);
    // update
    if (getSettingId) {
      const updateResult = await updateSetting({
        id: getSettingId,
        data: formData,
      });
    } else {
      // create
      const createResult = await createSetting(formData);
      resetForm();
      navigate("/");
    }
  };
  // formic submit
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="container mx-auto mt-8">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold mb-4">Website Settings</h2>

        {/* Logo Input */}
        <div className="mb-4">
          <label htmlFor="logo" className="block text-gray-600">
            Logo Image:
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue(
                "logo",
                (event.target.files && event.target.files[0]) || null
              );
            }}
            className={`mt-2 p-2 w-full border rounded-md ${
              formik.touched.logo && formik.errors.logo ? "border-red-500" : ""
            }`}
          />
          {formik.touched.logo && formik.errors.logo && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.logo}
            </div>
          )}
        </div>

        {/* Logo Preview */}
        {(formik.values.logo || (editData && editData.logo)) && (
          <div className="mb-4">
            <label className="block text-gray-600">Logo Preview:</label>
            <img
              key={
                formik.values.logo instanceof File
                  ? formik.values.logo.name
                  : "editLogo"
              }
              src={
                formik.values.logo
                  ? URL.createObjectURL(formik.values.logo)
                  : editData
                  ? editData.logo
                  : ""
              }
              alt="Logo Preview"
              className="mt-2 max-w-full h-auto"
            />
          </div>
        )}

        {/* Favicon Input (URL) */}
        <div className="mb-4">
          <label htmlFor="favicon" className="block text-gray-600">
            Favicon URL:
          </label>
          <input
            type="text"
            id="favicon"
            name="favicon"
            value={formik.values.favicon}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-2 p-2 w-full border rounded-md ${
              formik.touched.favicon && formik.errors.favicon
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.favicon && formik.errors.favicon && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.favicon}
            </div>
          )}
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600">
            Website Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-2 p-2 w-full border rounded-md ${
              formik.touched.title && formik.errors.title
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.title}
            </div>
          )}
        </div>
        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600">
            Brand Name:
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            value={formik.values.brandName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-2 p-2 w-full border rounded-md ${
              formik.touched.brandName && formik.errors.brandName
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.brandName && formik.errors.brandName && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.brandName}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Setting;
