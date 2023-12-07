import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  role: "player",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_USER: (state, { payload }) => {
      state.username = payload.username;
      state.role = "player";
    },
  },
});

export const { SET_USER } = userSlice.actions;
export default userSlice.reducer;
