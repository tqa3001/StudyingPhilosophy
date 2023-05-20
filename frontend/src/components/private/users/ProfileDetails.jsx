export default function ProfileDetails({ editMode }) {
  if (editMode) {
    display = (
      <form action="#" method="POST">
        <section>
          <label>Username: </label> 
          <input type="text" />
        </section>
        
        <section>
          <label>Name: </label> 
          <input type="text" />
        </section>
  
        <section>
          <label>New Password (make a separate component): </label> 
          <input type="password" />
        </section>
  
      </form>
    )
  } else {
    display = <div>Cringe ah ah display no edit!</div>
  }
  return display; 
}