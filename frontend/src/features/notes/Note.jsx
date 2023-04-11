import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { TypeToStyleAttributes } from "../../styles/noteStyle";
import { useState } from "react";
import DeleteNotePopup from "./Delete/DeleteNotePopup";
import CreateNewNote from "./CreateNewNote";
import { useSelector } from "react-redux";
import { selectSourceById, useGetSourcesQuery } from "../sources/sourcesApiSlice";

export default function Note({ note }) {
  /* How do I refactor this mess? */
  const { isLoading, isError } = useGetSourcesQuery(); 
  const source = useSelector(state => selectSourceById(state, note.sourceID)); 
  const [showCreate, setShowCreate] = useState(0); 
  const [showEdit, setShowEdit] = useState(0); 
  const [showDelete, setShowDelete] = useState(0); 
  const toggleCreateComponent = () => { setShowCreate(showCreate ^ 1); }
  const toggleEditComponent = () => { setShowEdit(showEdit ^ 1); }
  const toggleDeleteComponent = () => { setShowDelete(showDelete ^ 1); }
  let createComponent = (!showCreate || isLoading) ? null : 
    <CreateNewNote source={source} note={note}/>
  let editComponent = !showEdit ? null : <div>Haha edit component!</div> 
  let deleteComponent = !showDelete ? null : <DeleteNotePopup noteID={note.id}/> 
  const display = (
    <div className={TypeToStyleAttributes[note.noteType] + " w-fit"}>
      <div className="text-3xl font-bold">{note.title}</div>
      <p>{note.text}</p>
      <div className="flex justify-between">
        <button 
          onClick={toggleCreateComponent}
          className="bg-white text-black rounded-full px-2 py-1 m-1">
            New link
        </button>
        <div>
          <button className="bg-white text-black rounded-full px-2 py-1 m-1">
            <FontAwesomeIcon icon={faArrowLeft}/>
          </button>
          <button 
            onClick={toggleEditComponent}
            className="bg-white text-black rounded-full px-2 py-1 m-1">
            <FontAwesomeIcon icon={faEdit}/>
          </button>
          <button className="bg-white text-black rounded-full px-2 py-1 m-1">
            <FontAwesomeIcon icon={faArrowRight}/>
          </button>
          <button 
            onClick={toggleDeleteComponent}
            className="bg-red-600 text-white rounded-full px-3 py-1 m-1">
            <FontAwesomeIcon icon={faRemove}/>
          </button>
        </div>
      </div>
      {editComponent}
      {createComponent}
      {deleteComponent}
    </div>
  )
  return display
}