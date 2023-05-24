import { useState } from "react";
import { warning, primary, feature } from "../../../styles/componentStyle";

export default function ProfileDetails({ editMode, user }) {
  let display = null;
  const [changePassword, setChangePassword] = useState(0);
  const showChangePassword = () => setChangePassword(1)

  let passwordComponent = <div onClick={showChangePassword}>Change password</div>
  if (changePassword) {

    passwordComponent = 

    <div className="table w-full">
      <div className="table-row-group">

        <div className="table-row m-2">
          <div className="table-cell font-bold">Enter old password:</div>
          <div className="table-cell">
            <input type="password"/>
          </div>
        </div>

        <div className="table-row m-2">
          <div className="table-cell font-bold">Enter new password:</div>
          <div className="table-cell">
            <input type="password"/>
          </div>
        </div>
        
        <div className="table-row m-2">
          <div className="table-cell font-bold">Re-enter new password:</div>
          <div className="table-cell">
            <input type="password"/>
          </div>
        </div>

      </div>
    </div>
  }

  if (editMode) {
    display = (
      <form action="#" method="POST" className={feature +
        " px-10 py-10 rounded-lg"}>
        <div className="text-2xl mb-5">Update details</div>

        <div className="table w-full">
          <div className="table-row-group">
            <div className="table-row m-2">
              <div className="table-cell font-bold">Username</div>
              <div className="table-cell">
                <input type="text" value={user.username}/>
              </div>
            </div>
            <div className="table-row m-2">
              <div className="table-cell font-bold">Email</div>
              <div className="table-cell">
                <input type="text" value={user.email}/>
              </div>
            </div>
          </div>
        </div>

        {passwordComponent}
        
        <button type="button" className={warning + "px-6 py-2 mt-5 mr-3"}>Update</button>
  
      </form>
    )
  } else {
    display = <div className={primary + "rounded-lg px-10 py-5"}>
      <div className="table w-full">
        <div className="table-row-group">
          <div className="table-row m-2">
            <div className="table-cell font-bold">Username</div>
            <div className="table-cell">{user.username}</div>
          </div>
          <div className="table-row m-2">
            <div className="table-cell font-bold">Email</div>
            <div className="table-cell">{user.email}</div>
          </div>
        </div>
      </div>
    </div>
  }
  return (
    <div>
      {display}
    </div>
  )
}