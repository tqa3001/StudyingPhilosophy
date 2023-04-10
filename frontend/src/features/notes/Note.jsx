import { useSelector } from "react-redux";
import { selectNoteById, useGetNotesQuery } from "./notesApiSlice";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";

const TypeToStyleAttributes = {
  "citation": "bg-gray-300 text-black rounded-lg p-3",
  "elaboration": "bg-blue-300 text-black rounded-lg p-3",
  "question": "bg-red-300 text-black rounded-lg p-3",
  "resolved-question": "bg-orange-300 text-black rounded-lg p-3",
  "answer": "bg-green-400 text-white",
  "observation": "bg-yellow-500 text-black"
}; 

export default function Note({ note }) {
  const display = (
    <div className={TypeToStyleAttributes[note.noteType] + " w-fit"}>
      <div className="text-3xl font-bold">{note.title}</div>
      <p>{note.text}</p>
      <div className="flex justify-between">
        <button className="bg-white rounded-full px-2 py-1 m-1">New link</button>
        <div>
          <button className="bg-white rounded-full px-2 py-1 m-1">
            <FontAwesomeIcon icon={faArrowLeft}/>
          </button>
          <button className="bg-white rounded-full px-2 py-1 m-1">
            <FontAwesomeIcon icon={faEdit}/>
          </button>
          <button className="bg-white rounded-full px-2 py-1 m-1">
            <FontAwesomeIcon icon={faArrowRight}/>
          </button>
          <button className="bg-red-600 text-white rounded-full px-3 py-1 m-1">
            <FontAwesomeIcon icon={faRemove}/>
          </button>
        </div>
      </div>
    </div>
  )
  return display
}