import { useState } from "react";

export default function ProfileDetails({ editMode }) {
  let display = null;
  const [changePassword, setChangePassword] = useState(0);
  const showChangePassword = () => setChangePassword(1)

  let passwordComponent = <button>Change password</button>
  if (changePassword) {
    passwordComponent = <div>
      <input name="oldPassword" type="password" />
      <input name="newPassword" type="password" />
      <input name="retypePassword" type="password" />
      <button type="button">Change password</button>
    </div>
  }

  if (editMode) {
    display = (
      <form action="#" method="POST">
        <div className="text-2xl">Update details</div>
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
        
        <button type="button">Update</button>
  
      </form>
    )
  } else {
    display = <div>Cringe ah ah display no edit!</div>
  }
  return (
    <div className="bg-blue-500 hover:bg-blue-700 p-5">
      {display}
    </div>
  )
}