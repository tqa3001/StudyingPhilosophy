import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import ProfileDetails from './ProfileDetails'

export default function Settings() {
  const [editMode, setEditMode] = useState(0); 
  const editModeChange = () => {
    setEditMode(editMode ^ 1); 
  }
  return (
    <div>
      <ProfileDetails mode={editMode} />
      <button onClick={editModeChange}>Update profile details</button>
      <h1 className="font-bold"> Settings <FontAwesomeIcon icon={faCog}/></h1>
    </div>
  )
}