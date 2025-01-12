import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"], // Invalider le cache des commandes
    }),

    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      providesTags: ["Order"], // Associer au cache des commandes
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      providesTags: ["Order"],
      keepUnusedDataFor: 60, // Conserver les données plus longtemps
    }),

    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      providesTags: ["Order"],
    }),

    getTotalOrders: builder.query({
      query: () => `${ORDERS_URL}/total-orders`,
      providesTags: ["Order"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `${ORDERS_URL}/${orderId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Order"], // Actualiser les données des commandes
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useGetTotalOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApiSlice;
