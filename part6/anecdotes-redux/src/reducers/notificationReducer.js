import { createSlice } from "@reduxjs/toolkit";

const notifSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotif(_, action) {
      return action.payload;
    },
    deleteNotif() {
      return null;
    },
  }
})

export default notifSlice.reducer;
export const { setNotif, deleteNotif } = notifSlice.actions;

// using the thunk pattern to have a built-in reusable timer
export const showNotification = (message) => (dispatch) => {
  dispatch(setNotif(message))
  setTimeout(() => dispatch(deleteNotif()), 3000)
}
