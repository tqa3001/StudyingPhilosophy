import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectNoteById, useGetNotesQuery } from "./notesApiSlice";

const TypeToStyleAttributes = {
  "citation": "bg-gray-300 text-black rounded-lg p-3 m-3",
  "elaboration": "bg-blue-300 text-black rounded-lg p-3 m-3",
  "question": "bg-red-300 text-black rounded-lg p-3 m-3",
  "resolved-question": "bg-orange-300 text-black rounded-lg p-3 m-3",
  "answer": "bg-green-400 text-white",
  "observation": "bg-yellow-500 text-black"
}; 

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
      <div className={TypeToStyleAttributes[note.noteType]}>
        {note.id} | {note.title}
      </div>
    </Link>
  )
  return display;
}