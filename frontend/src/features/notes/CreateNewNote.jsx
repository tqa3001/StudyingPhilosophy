import "../../styles/tableStyle.css"; 
import { buttonStyleStr } from "../../styles/buttonStyle"; 
import { useAddNoteMutation } from "./notesApiSlice"; 

export default function CreateNewNote({ source }) {
  const [ addNote, mutationResult ] = useAddNoteMutation(); 
  const submitNewNote = async () => {
    const formEl = document.getElementById("createNoteForm"); 
    const data = new FormData(formEl); 
    data.append("sourceID", source.id);
    const convertedData = Object.fromEntries(data.entries());
    console.log(convertedData); 
    if (convertedData.parentNoteID == "null")
      delete convertedData.parentNoteID;
    addNote(convertedData); 
  }
  return (
    <div className="bg-gray-300 p-5 rounded-lg">
      <div className="text-2xl font-bold">Create New Note</div>
      <form className="flex-col my-5" id="createNoteForm">
        <table>
          <tr>
            <td>Source:</td>
            <td>{source.id} | {source.title}</td>
          </tr>
          <tr>
            <td>Parent note:</td>
            <td>
              <select id="parentNote" name="parentNoteID" className="border-2 border-black m-2 rounded-lg">
                <option value="null">No parent note</option>
                <option value="test2">Test2</option>
              </select>  
            </td>
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