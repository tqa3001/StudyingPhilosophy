export default function CreateNewNote({ currentNoteID }) {
  return (
    <div className="bg-gray-300 m-3 p-3">
      <div className="text-2xl font-bold">Create New Note</div>
      <hr className="h-1 bg-black"/>
      <form method="GET" action="" className="flex-col">
        <legend>Source:</legend>
        <legend>Parent:</legend>
        <div>
          <span>Type: </span>
          <input list="noteType" className="border-2 border-black" />
          <datalist id="noteType">
            <option value="Citation" />
            <option value="Elaboration" />
            <option value="Question" />
            <option value="Answer"/>
            <option value="Observation" />
          </datalist>
        </div>  
        <div>
          <span>Title: </span>
          <input type="text" placeholder="No more than 50 words"/>
        </div>
        <div>
          <div>Description:</div>
          <textarea></textarea>
        </div>
        <button type="submit">Create note</button>
      </form>
    </div>
  )
}