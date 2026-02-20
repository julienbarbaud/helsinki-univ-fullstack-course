import { createSlice } from "@reduxjs/toolkit";

// export const setFilter = (value) => {
//   return {
//     type: 'SET_FILTER',
//     payload: value,
//   }
// }

// const filterReducer = (state='', action) => {
//   console.log(action);
//   if (action.type==='SET_FILTER'){
//     return action.payload;
//   } else {
//     return state;
//   }
// }

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(_, action) {
      return action.payload
    }
  }
})

export default filterSlice.reducer;
export const { setFilter } = filterSlice.actions;
