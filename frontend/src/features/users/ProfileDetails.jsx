import { useState } from "react";

export default function ProfileDetails({ mode }) {
  let display = null; 
  const [userState, updateUserState] = useState(0); 
  if (mode) {
    display = (
      <div>
        cock
      </div>
    )
  } else {
    display = (
      <div>
        balls
      </div>
    )
  }
  return display; 
}