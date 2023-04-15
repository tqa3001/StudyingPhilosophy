import { createSlice } from "@reduxjs/toolkit"
/**
 * Actions, ideally, should report things that happened, not make things happen.
 * Compare: normal redux vs redux toolkit creating a "slice"
 * - Normal redux: Define your own action types, write your own action creators + a single reducer (switch/case)
 * - Redux toolkit: Use createSlice(), write reducers corresponding to actions, automatically produces:
 *   + The reducer: slice.reducer
 *   + Action creators: slice.actions
 */

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    sessionID: null,
    userID: null,
    errorMessage: null
  },
  reducers: {  
    loginIsSuccessful: (state, action) => { 
      return action.payload;
    },
    loginIsFailure: (state, action) => {
      return { 
        sessionID: null,
        userID: null,
        errorMessage: action.payload.err 
      };  // according to backend?
    }
  }
}); 

export default sessionSlice.reducer;
export const { loginIsSuccessful, loginIsFailure } = sessionSlice.actions;
