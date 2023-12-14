import apiSlice from "../../app/api/apiSlice.ts";

const invoiceApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["invoice"],
  endpoints: (builder) => ({
    getAllInvoice: builder.query({
      query: () => "/api/v1/invoice",
      providesTags: ["invoice"],
    }),
    createInvoice: builder.mutation({
      query: (data) => ({
        url: "/api/v1/invoice",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["invoice"],
      // Use invalidateTags to refetch the invoice list after creating a new invoice
    }),
    deleteInvoice: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/v1/invoice/${id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["invoice"],
    }),
  }),
});

export const {
  useCreateInvoiceMutation,
  useGetAllInvoiceQuery,
  useDeleteInvoiceMutation,
} = invoiceApiSlice;

export default invoiceApiSlice;
