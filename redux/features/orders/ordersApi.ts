import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (type) => ({
        url: `get-orders`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getStripePublishableKey: builder.query({
      query: () => ({
        url: `payment/stripepublishablekey`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // createPaymentIntent: builder.mutation({
    //   query: ({amount,description}) => ({
    //     url: "payment",
    //     method: "POST",
    //     body: {
    //       amount,
    //       description
    //     },
    //     credentials: "include" as const,
    //   }),
    // }),
    createPaymentIntent: builder.mutation({
      query: ({ amount, description, shipping }) => ({
        url: "payment", 
        method: "POST",
        body: {
          amount,      
          description, 
          shipping
        },
        credentials: "include",  
        headers: {
          "Content-Type": "application/json",  
        },
      }),
    }),
    
    createOrder: builder.mutation({
      query: ({ courseId, payment_info}) => ({
        url: "create-order",
        body: {
          courseId,
          payment_info,
          
        },
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetStripePublishableKeyQuery,
  useCreatePaymentIntentMutation,
  useCreateOrderMutation,
} = ordersApi;
