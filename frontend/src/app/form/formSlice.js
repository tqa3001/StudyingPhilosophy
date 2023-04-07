const initialState = {}; 

export function formReducer(state = initialState, action) {
  switch (action.type) {
    case "form/edit":
      return action.payload;
    case "form/reset":
      return initialState; 
    default:  // important 
      return state; 
  }
}