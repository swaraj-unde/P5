import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
};

export const createNewOrder = createAsyncThunk(
  "/order/create",
  async (orderData) => {
    const res = await axios.post(
      `http://localhost:3000/api/shop/order/create`,
      orderData,
    );
    return res.data;
  },
);

export const capturePayment = createAsyncThunk(
  "/order/capture",
  async ({ paymentId, payerId, orderId }) => {
    const res = axios.post("http://localhost:3000/api/shop/order/capture", {
      paymentId,
      orderId,
      payerId,
    });
    return res.data;
  },
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currOrderId",
          JSON.stringify(action.payload.orderId),
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      });
  },
});

export default shoppingOrderSlice.reducer;
