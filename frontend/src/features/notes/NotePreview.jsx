import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectNoteById, useGetNotesQuery } from "./notesApiSlice";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TypeToStyleAttributes } from "../../styles/noteStyle"; 

export default function NotePreview({ noteID }) {
  const { isLoading, isError } = useGetNotesQuery(); 
  const note = useSelector((state) => selectNoteById(state, noteID));
  let display = null;
  if (isLoading) display = <div>Loading...</div>
  else if (isError) display = <div>Item error</div>
  else display = (
    
      <Link 
        to={`/dashboard/notes/${note.id}`}
        state={{ noteID: note.id }}
        relative="path"
      >
        <div className={TypeToStyleAttributes[note.noteType] + " flex justify-between"}>
          <div className="ml-2">{note.title}</div>
          <div>{note.id}</div>
        </div>
      </Link>
    
  )
  return display;
}