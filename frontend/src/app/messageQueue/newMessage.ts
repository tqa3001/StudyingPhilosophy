import { newMessageInserted, oldestMessagePopped } from "./messageQueueSlice";
import store from "../store";

const newMessage = (messageObj: { type: string, message: string }) => {
  store.dispatch(newMessageInserted(messageObj));
  setTimeout(() => store.dispatch(oldestMessagePopped({})), 5000);
}

export default newMessage;