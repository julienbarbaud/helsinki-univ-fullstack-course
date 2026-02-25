import { createSlice } from "@reduxjs/toolkit";

const localUser = JSON.parse(window.localStorage.getItem("user"));

const userSlice = createSlice({
  name: "user",
  initialState: localUser ? localUser : null,
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
  },
});

const { setUser } = userSlice.actions;

export const setLocalUser = (user) => (dispatch) => {
  dispatch(setUser(user));
  if (user) {
    window.localStorage.setItem("user", JSON.stringify(user));
  } else {
    window.localStorage.removeItem("user");
  }
};

export default userSlice.reducer;
