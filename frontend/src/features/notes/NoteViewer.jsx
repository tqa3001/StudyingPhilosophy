import Note from "./Note";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectNoteById, useGetNotesQuery } from "./notesApiSlice";
import { selectSourceById, useGetSourcesQuery } from "../sources/sourcesApiSlice";
import NotePreview from "./NotePreview";

export default function NoteViewer() {
  const location = useLocation();
  const { noteID } = location.state; 
  const { isLoading: isLoadingNotes, isError: isErrorNotes } = useGetNotesQuery(); 
  const { isLoading: isLoadingSources, isError: isErrorSources } = useGetSourcesQuery(); 
  const note = useSelector((state) => selectNoteById(state, noteID)); // to select one must query first
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
    console.log("slaying quees", source); 
    let caption = null; 
    let previous = null;
    let after = null; 
    if (isErrorSources) {
      caption = <div>Error displaying source</div>
    } else {
      caption = (
        <div className="font-bold">
          <div>Viewing notes for: {source.title} </div>
        </div>
      )
      if (note.parentNoteID) {
        previous = <NotePreview noteID={note.parentNoteID}/>
      } else {
        previous = 
        <div className="rounded-lg p-3 bg-violet-700 text-white">
          Source: {note.sourceID}
        </div>
      }
    }
    display = (
      <div>
        {caption}
        <div className="flex h-full">
          {previous}
          <Note note={note} />
        </div>
      </div>
    )
  }
  return display; 
}