import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotif(_, action) {
      return action.payload;
    },
    clearNotif() {
      return "";
    },
  },
});

const { setNotif, clearNotif } = notificationSlice.actions;

// call a thunkithunkboi
const showNotifOrError = (notif) => (dispatch) => {
  dispatch(setNotif(notif));
  setTimeout(() => dispatch(clearNotif()), 3000);
};

export const showNotif = (message) =>
  showNotifOrError({ message, isError: false });

export const showError = (message) =>
  showNotifOrError({ message, isError: true });

export default notificationSlice.reducer;
