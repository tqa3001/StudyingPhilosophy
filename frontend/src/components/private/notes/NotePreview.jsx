import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectNoteById, useGetNotesQuery } from "../../../features/notes/notesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TypeToStyleAttributes } from "../../../styles/noteStyle"; 

export default function NotePreview({ sourceID, noteID }) {
  const { isLoading, isError } = useGetNotesQuery(); 
  const note = useSelector((state) => selectNoteById(state, noteID));
  let display = null;
  if (isLoading) {
    display = <div>Loading...</div>
  } else if (isError) {
    display = <div>Item error</div>
  } else {
    display = (
      <div>
        <Link 
          to={`/sources/${sourceID}/${note.id}`}
          state={{ noteID: note.id }}
          relative="path"
        >
          <div className={TypeToStyleAttributes[note.noteType] + " flex justify-between"}>
            <div className="ml-2">{note.title}</div>
          </div>
        </Link>
      </div>
    )
  }
  return display;
}