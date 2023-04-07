import "../../styles/tableStyle.css"; 
import { buttonStyleStr } from "../../styles/buttonStyle"; 

export default function CreateNewNote({ source }) {
  return (
    <div className="bg-gray-300 p-5 rounded-lg">
      <div className="text-2xl font-bold">Create New Note</div>
      <hr className="h-1 bg-green-600"/>
      <form method="POST" action="" className="flex-col my-5">
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
              <input type="text" name="text" placeholder="No more than 50 words" 
                className="m-2 border-2 border-black rounded-lg" required/>
            </td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>
              <textarea className="m-2 border-2 border-black rounded-lg" 
                placeholder="Add text" required></textarea>
            </td>
          </tr>
        </table>
        <button type="submit" className={buttonStyleStr + " mt-5"}>Create note</button>
      </form>
    </div>
  )
}