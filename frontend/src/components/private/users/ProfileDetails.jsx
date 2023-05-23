import { useState } from "react";
import { warning, primary, feature } from "../../../styles/componentStyle";

export default function ProfileDetails({ editMode }) {
  let display = null;
  const [changePassword, setChangePassword] = useState(0);
  const showChangePassword = () => setChangePassword(1)

  let passwordComponent = <div onClick={showChangePassword}>Change password</div>
  if (changePassword) {
    passwordComponent = <div>
      <section>
        <label>Old password</label>
        <input name="oldPassword" type="password" />
      </section>
      <input name="newPassword" type="password" />
      <input name="retypePassword" type="password" />
    </div>
  }

  if (editMode) {
    display = (
      <form action="#" method="POST" className={"border-b-4 border-gray-400 bg-gray-300" +
        " px-10 py-10 rounded-lg max-w-1/2"}>
        <div className="text-2xl mb-5">Update details</div>
        <section>
          <label>Username: </label> 
          <input type="text" />
        </section>
        
        <section>
          <label>Name: </label> 
          <input type="text" />
        </section>
  
        <section>
          {passwordComponent}
        </section>
        
        <button type="button" className={warning + "px-6 py-2 mt-5 mr-3"}>Update</button>
        <button type="button" className={primary + "px-6 py-2 mt-5"}>Cancel</button>
  
      </form>
    )
  } else {
    display = <div className={primary + "rounded-lg px-10 py-5"}>
      Cringe ah ah display no edit!
    </div>
  }
  return (
    <div>
      {display}
    </div>
  )
}