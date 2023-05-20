import "../../../styles/tableStyle.css"; 
import { buttonStyleStr } from "../../../styles/buttonStyle"; 
import { useAddNoteMutation } from "../../../features/notes/notesApiSlice"; 
import { useNavigate } from "react-router-dom";

export default function CreateNewNote({ source, note }) {
  const [ addNote, mutationResult ] = useAddNoteMutation(); 
  const navigate = useNavigate();
  const submitNewNote = async () => {
    const formEl = document.getElementById("createNoteForm"); 
    const data = new FormData(formEl); 
    data.append("sourceID", source.id);
    const convertedData = Object.fromEntries(data.entries());
    if (note) {
      convertedData.parentNoteID = note.id;
    } else if (convertedData.parentNoteID == "null") {
      delete convertedData.parentNoteID;
    }
    console.log("certified hood create: ", convertedData); 
    addNote(convertedData); 
    navigate(0);
  }
  const title = !note ? "Create new note" : "Add result from current note";
  const chooseParentNote = note ? <div>{note.title} | {note.id}</div> : (
    <select id="parentNote" name="parentNoteID" className="border-2 border-black m-2 rounded-lg">
      <option value="null">No parent note</option>
    </select>  
  ); 
  return (
    <div className="p-5 rounded-lg">
      <div className="text-2xl font-bold">{title}</div>
      <form className="flex-col my-5" id="createNoteForm">
        <table>
          <tr>
            <td>Source:</td>
            <td>{source.id} | {source.title}</td>
          </tr>
          <tr>
            <td>Parent note:</td>
            <td>{chooseParentNote}</td>
          </tr>
          <tr>
            <td>Type:</td>
            <td>
              <select id="noteType" name="noteType" className="border-2 border-black m-2 rounded-lg">
                <option value="citation">Citation</option>
                <option value="elaboration">Elaboration</option>
                <option value="question">Question</option>
                <option value="answer">Answer</option>
                <option value="observation">Observation</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Title:</td> 
            <td>
              <input type="text" name="title" placeholder="No more than 50 words" 
                className="m-2 border-2 border-black rounded-lg" required/>
            </td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>
              <textarea name="text" className="m-2 border-2 border-black rounded-lg" 
                placeholder="Add text" required></textarea>
            </td>
          </tr>
        </table>
        <div onClick={submitNewNote} className={buttonStyleStr + " mt-5"}>Create note</div>
      </form>
    </div>
  )
}