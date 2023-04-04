import { useGetNotesQuery } from "./notesApiSlice"

const TypeToStyleAttributes = {
  "citation": "bg-gray-300 text-black rounded-lg p-3 m-3",
  "elaboration": "bg-blue-300 text-black rounded-lg p-3 m-3",
  "question": "bg-red-300 text-black rounded-lg p-3 m-3",
  "answer": "bg-green-400 text-white",
  "observation": "bg-yellow-500 text-black"
}; 

export default function ListNotes() {
  const notesQuery = useGetNotesQuery();
  const notes = notesQuery.data;
  const { isError, isLoading } = notesQuery;
  let display = null 
  if (isLoading) {
    display = <div>Loading notes...</div>
  } else if (isError) {
    display = <div>Unable to display notes</div>
  } else {
    display = (
      <div>
        {notes.map(note => (
          <div className={TypeToStyleAttributes[note.noteType]}>
            {note.id} | {note.title}
          </div>
        ))}
      </div>
    )
  }
  return (
    <div>
      <div className="font-bold text-3xl">All users' notes</div>
      {display}
    </div>
  )
}