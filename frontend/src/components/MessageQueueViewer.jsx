import { useAutoAnimate } from "@formkit/auto-animate/react"
import store from "../app/store";
import notificationColor from "../styles/notificationStyle"
import { newMessageInserted } from "../app/messageQueue/messageQueueSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function MessageBoard() {
  const dispatch = useDispatch();
  const [animationParent] = useAutoAnimate();
  /* 
    `const state = store.getState();` is not enough:
    dispatch() is just a function so the component won't rerender if we don't subscribe `state` 
    to changes to the store.
  */
  const state = useSelector(state => state);
  const newErrorMessage = () => { dispatch(newMessageInserted({type: "error", message: "Error message"})); }
  const newSuccessMessage = () => { dispatch(newMessageInserted({type: "success", message: "Success message"})); }
  const newInfoMessage = () => { dispatch(newMessageInserted({type: "info", message: "Info message"})); }
  return (
    <div>
      <div className="text-orange-500">TODO:</div>
      Create action creator + some kind of setInterval to automatically delete from queue <br /> 
      <button onClick={newErrorMessage}>New Error message</button>
      <br />
      <button onClick={newSuccessMessage}>New Success message</button>      
      <br />
      <button onClick={newInfoMessage}>New Info message</button> 
      <br/>
      <div ref={animationParent}>
        {state.messageQueue.map((item, index) => (
          <div key={index}
            className={"m-1 bg-gray-400 rounded-lg px-5 " + notificationColor[item.type]}>
            {item.message}
          </div>
        ))}
      </div> 
    </div> 
  )
}