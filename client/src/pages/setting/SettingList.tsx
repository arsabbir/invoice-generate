// import DataTable, { TableColumn } from "react-data-table-component";
// import { Link } from "react-router-dom";
// import { useGetSettingQuery } from "../../feature/setting/settingApiSlice.ts";
// import { TiEdit } from "react-icons/ti";
// interface Setting {
//   logo: string;
//   title: string;
//   favicon: string;
//   _id: string;
//   // Add more properties as needed
// }

// const Setting: React.FC = () => {
//   const { data, isError, isLoading } = useGetSettingQuery("okk");

//   const columns: TableColumn<Setting>[] = [
//     {
//       name: "Website Logo",
//       selector: (row: Setting) => (
//         <img
//           style={{
//             width: "50px",
//             height: "50px",
//             margin: "10px",
//             objectFit: "cover",
//           }}
//           src={row.logo}
//           alt="Website Logo"
//         />
//       ),
//       // sortable: true,
//     },
//     {
//       name: "Brand Name",
//       selector: (row: Setting) => row?.favicon,
//       sortable: true,
//     },
//     {
//       name: "Title",
//       selector: (row: Setting) => row.title,
//       sortable: true,
//     },
//     {
//       name: "Action",
//       selector: (row) => (
//         <>
//           <Link
//             to={`/setting-add/${row._id}`}
//             className="btn btn-warning mr-1 btn-sm"
//           >
//             <TiEdit className="h-5 w-5 text-green-500" />
//           </Link>
//         </>
//       ),
//     },
//     // Add more columns as needed
//   ];

//   if (isLoading) {
//     return <div>Loading...</div>; // Handle loading state
//   }

//   if (isError) {
//     return <div>Error loading data</div>; // Handle error state
//   }

//   return (
//     <>
//       <div className="mt-5 p-10">
//         <div className="">
//           <div className="flex justify-start mr-5">
//             <Link
//               to="/setting-add"
//               className="text-white max-w-[250px] flex justify-center items-center bg-[#53BD70] hover:bg-[#53BD70] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:focus:ring-[#53BD70]"
//             >
//               Add new Setting
//             </Link>
//           </div>
//           <br />
//           <br />
//           <DataTable
//             fixedHeader
//             pagination
//             className="shadow-sm"
//             title="All Invoices Data"
//             columns={columns}
//             data={data || []} // Ensure data is an array (or provide a default empty array)
//             selectableRows
//             highlightOnHover
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Setting;
