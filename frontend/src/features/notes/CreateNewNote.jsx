import "../../styles/tableStyle.css"; 
import { buttonStyleStr } from "../../styles/buttonStyle"; 

export default function CreateNewNote({ source }) {
  return (
    <div className="bg-gray-300 m-3 p-3">
      <div className="text-2xl font-bold">Create New Note</div>
      <hr className="h-1 bg-black"/>
      <form method="GET" action="" className="flex-col mt-3">
        <table>
          <tr>
            <td>Source:</td>
            <td>{source.id} | {source.title}</td>
          </tr>
          <tr>
            <td>Parent note:</td>
            <td>
              <select id="parentNote" name="parentNote" className="border-2 border-black m-2 rounded-lg">
                <option value="test1">Test1</option>
                <option value="test2">Test2</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Type:</td>
            <td>
              <input list="noteType" className="border-2 border-black m-2 rounded-lg" readOnly/>
              <datalist id="noteType">
                <option value="Citation" />
                <option value="Elaboration" />
                <option value="Question" />
                <option value="Answer"/>
                <option value="Observation" />
              </datalist>
            </td>
          </tr>
          <tr>
            <td>Title:</td> 
            <td>
              <input type="text" placeholder="No more than 50 words"/>
            </td>
          </tr>
          <tr>
            <td>Description:</td>
            <td><textarea></textarea></td>
          </tr>
        </table>
        <button type="submit" className={buttonStyleStr}>Create note</button>
      </form>
    </div>
  )
}