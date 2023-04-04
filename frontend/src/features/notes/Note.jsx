import { useSelector } from "react-redux";
import { selectNoteById, useGetNotesQuery } from "./notesApiSlice";
import { useLocation } from "react-router-dom";

const TypeToStyleAttributes = {
  "citation": "bg-gray-300 text-black rounded-lg p-3 m-3",
  "elaboration": "bg-blue-300 text-black rounded-lg p-3 m-3",
  "question": "bg-red-300 text-black rounded-lg p-3 m-3",
  "resolved-question": "bg-orange-300 text-black rounded-lg p-3 m-3",
  "answer": "bg-green-400 text-white",
  "observation": "bg-yellow-500 text-black"
}; 

export default function Note() {
  const location = useLocation();
  const { noteID } = location.state; 
  const { isLoading, isError} = useGetNotesQuery(); 
  const note = useSelector((state) => selectNoteById(state, noteID)); // to select one must query first
  let display = null; 
  console.log("me may beo", noteID, note);
  if (isLoading) 
    display = <div>Loading note...</div>
  else if (isError)
    display = <div>Error: Unable to load note</div>
  else 
    display = (
      <div className={TypeToStyleAttributes[note.noteType] + " w-fit"}>
        <div className="text-3xl">{note.title}</div>
        <p>{note.text}</p>
      </div>
    )
  return display
}