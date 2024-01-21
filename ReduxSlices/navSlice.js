import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    origin: null,
    destination: null,
    timePriceInformation: null
}

const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
      setOrigin: (state, action) => {
        state.origin = action.payload;
      },
      
      setDestination: (state, action) => {
        state.destination = action.payload;
      },
      setTimePriceInformation: (state, action) => {
        state.timePriceInformation = action.payload;
      }
    }
  })
  
export const { setOrigin, setDestination, setTimePriceInformation } = navSlice.actions
  

// Select the function (Selector)
export const selectOrigin = (state) => (state.nav.origin);
export const selectDestination = (state) => (state.nav.destination);
export const selectTimePriceInformation = (state) => (state.nav.timePriceInformation);

export default navSlice.reducer;