import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  address: "",
  note: "",
  selectedProduct: [],
  totalMonney: "",
};

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      // const orderItem = {
      //   user_id: user?.id,
      //   products: [
      //     {
      //       product_id: product?.id,
      //       name: product?.name,
      //       image: product?.images.split(",")[0],
      //       sale: product?.sale,
      //       price: product?.price,
      //       quantity: 1,
      //     },
      //   ],
      // };
      // dispatch(addOrder(orderItem));
      const { user_id, products } = action.payload;
      const existingOrderItem = state.orderItems.find(
        (item) => item.user_id === user_id,
      );
      if (existingOrderItem) {
        const existingProductItem = existingOrderItem.products.find(
          (item) => item.product_id === products[0].product_id,
        );
        if (!existingProductItem) {
          existingOrderItem.products.push(...products);
        } else {
          existingProductItem.quantity++;
        }
      } else {
        state.orderItems.push(action.payload);
      }
    },
    decreaseQuantity: (state, action) => {
      // Giảm
      const { user_id, product_id } = action.payload;
      let existingOrderItem = state.orderItems.find(
        (item) => item.user_id === user_id,
      );
      if (existingOrderItem) {
        const existingProductItem = existingOrderItem.products.find(
          (item) => item.product_id === product_id,
        );

        if (existingProductItem) existingProductItem.quantity -= 1; //Redux-toolkit sẽ tự động thấy sự thay đổi và cập nhật lại state vì thế mà không cần sao chép lại state
        if (existingProductItem.quantity === 0) {
          existingOrderItem.products = existingOrderItem.products.filter(
            (item) => item.product_id !== existingProductItem.product_id,
          );
        }
      }
    },
    increaseQuantity: (state, action) => {
      const { user_id, product_id } = action.payload;
      let existingOrderItem = state.orderItems.find(
        (item) => item.user_id === user_id,
      );
      if (existingOrderItem) {
        const existingProductItem = existingOrderItem.products.find(
          (item) => item.product_id === product_id,
        );

        if (existingProductItem) existingProductItem.quantity += 1; //Redux-toolkit sẽ tự động thấy sự thay đổi và cập nhật lại state vì thế mà không cần sao chép lại state
      }
    },
    removeOrder: (state, action) => {
      const { user_id, product_id } = action.payload;
      const existingOrderItem = state.orderItems.find(
        (item) => item.user_id === user_id,
      );

      if (existingOrderItem) {
        const newProducts = existingOrderItem.products.filter(
          (item) => item.product_id != product_id,
        );
        existingOrderItem.products = newProducts;
      }
    },
    removeAllOrder: (state, action) => {
      const { product_ids, user_id } = action.payload;

      const existingOrderItem = state.orderItems.find(
        (item) => item.user_id === user_id,
      );

      if (existingOrderItem) {
        existingOrderItem.products = existingOrderItem.products.filter(
          (item) => !product_ids.includes(item.product_id),
        );
      }
    },
    addOrderInfo: (state, action) => {
      const { address, note, items, totalMonney } = action.payload;
      state.address = address;
      state.note = note;
      state.selectedProduct = items;
      state.totalMonney = totalMonney;
    },
    removeOrderInfo: (state, action) => {
      (state.note = ""), (state.address = "");
      state.totalMonney = 0;
      const product_ids = state.selectedProduct?.map(
        (item) => item?.product_id,
      );
      const { user_id } = action.payload;
      const existingOrderItem = state.orderItems.find(
        (item) => item.user_id === user_id,
      );

      if (existingOrderItem) {
        const newOrderItems = existingOrderItem.products.filter(
          (item) => !product_ids.includes(item.product_id),
        );
        existingOrderItem.products = newOrderItems;
        state.selectedProduct = [];
      }
    },
  },
});

export const {
  addOrder,
  removeOrder,
  increaseQuantity,
  decreaseQuantity,
  removeAllOrder,
  addOrderInfo,
  removeOrderInfo,
} = OrderSlice.actions;

export default OrderSlice.reducer;
