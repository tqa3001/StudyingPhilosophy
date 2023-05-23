import { feature } from "../../../styles/componentStyle"

export default function CreateNewSource() {
  return (<form id="sourceForm" className={feature + "p-10 w-full rounded-lg"}>
    <div className="font-bold text-2xl my-5">Create a new source</div>
    <div className="table w-full">
      <div className="table-header-group">
        <div className="table-row font-bold">
          <div className="table-cell text-left">Field</div>
          <div className="table-cell text-left">Data</div>
        </div>
      </div>
      <div className="table-row-group">
        <div className="table-row m-2">
          <div className="table-cell">Title</div>
          <div className="table-cell">
            <input type="text" placeholder="e.g. 1984" name="title" className="w-full"/>
          </div>
        </div>
        <div className="table-row">
          <div className="table-cell">URL</div>
          <div className="table-cell">
            <input type="text" 
              placeholder="https://en.wikipedia.org/wiki/Monitor_(synchronization)#Condition_variables" 
              name="url"
            />
          </div>
        </div>
        <div className="table-row">
          <div className="table-cell ...">Shining Star</div>
          <div className="table-cell ...">Earth, Wind, and Fire</div>
        </div>
      </div>
    </div>
      
      {/*
      <tr>
        <td>Origin</td>
        <td><input type="text" placeholder="e.g. Wikipedia" name="origin"/></td>
      </tr>
      <tr>
        <td>Description</td>
        <td><textarea name="description" /></td>
      </tr> */}
  </form>)
}