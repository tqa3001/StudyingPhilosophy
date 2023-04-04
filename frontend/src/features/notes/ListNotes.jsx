import { useGetNotesQuery } from "./notesApiSlice"
import NotePreview from "./NotePreview";

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
    console.log("bruh! ", notes.entities);
    display = (
      <div>
        {notes.ids.map(noteID => <div key={noteID}><NotePreview noteID={noteID} /></div>)}
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