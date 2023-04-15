import { createSlice } from "@reduxjs/toolkit";
import deepCopy from "../../helpers/deepcopy";

/* At first I implemented a queue class which made me realize that OOP doesn't work so well with React */

const messageQueueSlice = createSlice({
  name: "messageQueue",
  initialState: [],  // a list of html elements
  reducers: {  
    oldestMessagePopped(state) {
      const newState = [...state] // or deepCopy(state); 
      if (newState.length) 
        newState.splice(0, 1);  
      return newState;
    }, 
    newMessageInserted(state, action) {  
      return [...state, action.payload]
    }
  }
})

export default messageQueueSlice.reducer;
export const { oldestMessagePopped, newMessageInserted } = messageQueueSlice.actions;