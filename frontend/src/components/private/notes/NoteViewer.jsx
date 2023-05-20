import Note from "./Note";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectNoteById, useGetNotesQuery } from "../../../features/notes/notesApiSlice";
import { selectSourceById, useGetSourcesQuery } from "../../../features/sources/sourcesApiSlice";
import NotePreview from "./NotePreview";

export default function NoteViewer() {
  const { noteID } = useParams();
  const { isLoading: isLoadingNotes, isError: isErrorNotes } = useGetNotesQuery(); 
  const { isLoading: isLoadingSources, isError: isErrorSources } = useGetSourcesQuery(); 
  const note = useSelector((state) => selectNoteById(state, noteID));
  /**
   * This is unnecessary, I did this because I thought React didn't rerender sourceSelector 
   * with if else inside :(
   */
  let dynamicSourceSelector = null;  
  if (isLoadingNotes || isLoadingSources) {
    dynamicSourceSelector = (state) => null; 
  } else {
    dynamicSourceSelector = (state) => selectSourceById(state, note.sourceID);
  }
  const source = useSelector(dynamicSourceSelector); 
  let display = null;   
  if (isLoadingNotes || isLoadingSources) 
    display = <div>Loading note...</div>
  else if (isErrorNotes)
    display = <div>Error: Unable to load note</div>
  else {
    let caption = null; 
    let previous = null;
    console.log("balls", note.childNotes); 
    let after = note.childNotes.map(childNoteID => 
      <div className="mb-1">
        <NotePreview sourceID={note.sourceID} noteID={childNoteID} />
      </div>
    );
    if (isErrorSources) {
      caption = <div>Error displaying source</div>;
    } else {
      caption = <div>Viewing notes for: {source.title} </div>;
      if (note.parentNoteID) {
        previous = <NotePreview sourceID={note.sourceID} noteID={note.parentNoteID}/>
      } else {
        previous = 
        <Link to="..">
          <div className="rounded-lg p-3 bg-violet-700 text-white">
            Source: {note.sourceID}
          </div>
        </Link>
      }
    }
    display = (
      <div className="p-10">
        <div className="text-3xl font-bold mb-3">
          {caption}
        </div>
        <div className="flex h-full">
          <div className="mr-2">
            {previous}
          </div>
          <Note note={note} />
          <div className="ml-2">
            {after}
          </div>
        </div>
      </div>
    )
  }
  return display; 
}