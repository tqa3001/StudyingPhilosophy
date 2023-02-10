import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

export default function Settings() {
  return (
    <div>
      <h1>User settings</h1>
      <FontAwesomeIcon icon={faCog}/>
    </div>
  )
}