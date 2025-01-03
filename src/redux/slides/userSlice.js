import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  access_token: "",
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        id = "",
        email = "",
        name = "",
        phone = "",
        address = "",
        avatar = "",
        isAdmin = false,
      } = action.payload[0];

      const { access_token = "" } = action.payload;

      state.id = id;
      state.email = email;
      state.name = name || email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
    },
    resetUser: (state) => {
      state.id = "";
      state.email = "";
      state.name = "";
      state.phone = "";
      state.address = "";
      state.avatar = "";
      state.access_token = "";
      state.isAdmin = false;
    },
    updateAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser, updateAccessToken } = userSlice.actions;

export default userSlice.reducer;
