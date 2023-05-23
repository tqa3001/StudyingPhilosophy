import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { TypeToStyleAttributes } from "../../../styles/noteStyle";
import { useState } from "react";
import DeleteNotePopup from "./DeleteNotePopup";
import { useSelector } from "react-redux";
import { selectSourceById, useGetSourcesQuery } from "../../../features/sources/sourcesApiSlice";
import { feature } from "../../../styles/componentStyle";

export default function Note({ note }) {
  /* How do I refactor this mess? */
  const { isLoading, isError } = useGetSourcesQuery(); 
  const source = useSelector(state => selectSourceById(state, note.sourceID));
  const [showEdit, setShowEdit] = useState(0); 
  const [showDelete, setShowDelete] = useState(0); 
  const toggleEditComponent = () => { setShowEdit(showEdit ^ 1); }
  const toggleDeleteComponent = () => { setShowDelete(showDelete ^ 1); }
  let editComponent = !showEdit ? null : <div>Haha edit component!</div> 
  let deleteComponent = !showDelete ? null : <DeleteNotePopup noteID={note.id}/> 

  const display = (
    <div className={TypeToStyleAttributes[note.noteType] + " w-fit"}>
      <div className="text-xl font-bold">{note.title}</div>
      <p>{note.text.substring(0, 200)}</p>
      <div className="flex flex-row-reverse mt-2">
        <button 
          onClick={toggleDeleteComponent}
          className="bg-red-600 text-white rounded-lg px-4 py-2 m-1 
            hover:bg-red-800 border-b-2 border-red-800">
          <FontAwesomeIcon icon={faRemove}/>
        </button>
        <button 
          onClick={toggleEditComponent}
          className={feature + "rounded-lg bg-gray-300 h-fit py-2 my-auto"}>
          <FontAwesomeIcon className="fa-sm" icon={faEdit}/>
        </button>
      </div>
      {editComponent}
      {deleteComponent}
    </div>
  )

  return display
}