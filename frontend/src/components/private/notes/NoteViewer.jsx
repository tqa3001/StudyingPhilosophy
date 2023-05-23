import Note from "./Note";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CreateNewNote from "./CreateNewNote";
import { selectNoteById, useGetNotesQuery } from "../../../features/notes/notesApiSlice";
import { selectSourceById, useGetSourcesQuery } from "../../../features/sources/sourcesApiSlice";
import { feature } from "../../../styles/componentStyle";
import NotePreview from "./NotePreview";
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function NoteViewer() {
  const { noteID } = useParams();
 
  /* Select current note */
  const { isLoading: isLoadingNotes, isError: isErrorNotes } = useGetNotesQuery(); 
  const note = useSelector((state) => selectNoteById(state, noteID));
  
  /**
   * This is a bad implementation, I did this because I thought React didn't rerender sourceSelector 
   * with if else inside :(
   */
  const { isLoading: isLoadingSources, isError: isErrorSources } = useGetSourcesQuery(); 
  let dynamicSourceSelector = null;  
  if (isLoadingNotes || isLoadingSources) {
    dynamicSourceSelector = (state) => null; 
  } else {
    dynamicSourceSelector = (state) => selectSourceById(state, note.sourceID);
  }
  const source = useSelector(dynamicSourceSelector); 

  /* For creating new notes */
  const [showCreateNote, setShowCreateNote] = useState(0); 
  const toggleCreateNote = () => { setShowCreateNote(showCreateNote ^ 1); }
  let createNoteComponent = !showCreateNote ? 
    null : <CreateNewNote source={source} note={note}/>
  let createNoteButtonText = !showCreateNote ? 
    "Create a new note" : "Continue browsing notes"

  /* Main display */
  let display = null;   
  if (isLoadingNotes || isLoadingSources) {
    display = <div>Loading note...</div>
  } else if (isErrorNotes) {
    display = <div>Error: Unable to load note</div>
  } else {
    let caption = null; 
    let previous = null;
    let after = null;
    let current = <div>
      <Note note={note} />
      <button
        onClick={toggleCreateNote}
        className={feature + "mt-2 py-2 rounded-lg w-full"}>
          {createNoteButtonText}
      </button>
    </div>

    if (!showCreateNote) {
      after = note.childNotes.map(childNoteID => 
        <div className="mb-1">
          <NotePreview sourceID={note.sourceID} noteID={childNoteID} />
        </div>
      );
    }

    if (isErrorSources) {
      caption = <div>Error displaying source</div>;
    } else if (!showCreateNote) {
      caption = <div>Viewing notes for: {source.title} </div>;
      if (note.parentNoteID) {
        previous = <div className="mr-2 w-1/5">
          <NotePreview sourceID={note.sourceID} noteID={note.parentNoteID}/>
        </div>
      } else {
        previous = <div className="mr-2 w-1/5">
          <Link to="..">
            <div className="rounded-lg p-3 bg-violet-700 text-white">
              Source: {source.title}
            </div>
          </Link>
        </div>
      }
    } else {
      caption = <div>Viewing notes for: {source.title} </div>;
    }

    display = (
      <div className="p-10">
        <div className="text-3xl font-bold mb-3">
          {caption}
        </div>
        <div className="flex h-full">
          {previous}
          <div className="w-2/5 min-w-2/5">
            {current}
          </div>
          <div className="ml-2 w-auto">
            {after}
            {createNoteComponent}
          </div>
        </div>
      </div>
    )
  }

  /* wrap animation handler around display (not working) */
  // const [animationParent] = useAutoAnimate();
  // return <div ref={animationParent}>{display}</div>
  return display;
}