import { createSlice } from "@reduxjs/toolkit";

const initialState = { orderItems: [], address: "" };

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const checkProductExist = state.orderItems.find(
        (item) => item.product_id === action.payload.product_id,
      );
      if (!checkProductExist) {
        state.orderItems.push(action.payload);
      }
    },

    decreaseQuantity: (state, action) => {
      // Giảm
      const product_id = action.payload;
      const checkProductExist = state.orderItems.find(
        (item) => item.product_id === product_id,
      );

      if (checkProductExist) {
        checkProductExist.quantity -= 1; //Redux-toolkit sẽ tự động thấy sự thay đổi và cập nhật lại state vì thế mà không cần sao chép lại state
      }
    },
    increaseQuantity: (state, action) => {
      const product_id = action.payload;
      const checkProductExist = state.orderItems.find(
        (item) => item.product_id === product_id,
      );

      if (checkProductExist) {
        checkProductExist.quantity += 1;
      }
    },

    removeOrder: (state, action) => {
      const product_id = action.payload;
      const newProducts = state.orderItems.filter(
        (item) => item.product_id != product_id,
      );
      state.orderItems = newProducts;
    },
  },
});

export const { addOrder, removeOrder, increaseQuantity, decreaseQuantity } =
  OrderSlice.actions;

export default OrderSlice.reducer;
