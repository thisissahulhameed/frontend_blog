import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "auth",
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("user does not exist");
      }
    },
  },
});

export const { setLogin, setLogout, setFriends } = authSlice.actions;
export default authSlice.reducer;
