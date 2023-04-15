import { useAutoAnimate } from "@formkit/auto-animate/react"
import store from "../app/store";
import notificationColor from "../styles/notificationStyle"
import { newMessageInserted, oldestMessagePopped } from "../app/messageQueue/messageQueueSlice";
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
  const newMessage = (messageObj) => {
    dispatch(newMessageInserted(messageObj));
    setTimeout(() => dispatch(oldestMessagePopped()), 5000);
  }
  return ( 
    <div>
      <div className="text-orange-500">TODO:</div>
      Create action creator + some kind of setInterval to automatically delete from queue <br /> 
      <button onClick={
        () => newMessage({type: "error", message: "Error message"})
      }>New Error message</button>
      <br />
      <button onClick={
        () => newMessage({type: "success", message: "Success message"})
      }>New Success message</button>      
      <br />
      <button onClick={
        () => newMessage({type: "info", message: "Info message"})
      }>New Info message</button> 
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