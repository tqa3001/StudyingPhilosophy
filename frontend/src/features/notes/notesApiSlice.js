import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.title == b.title ? 0 : (a.title < b.title ? -1 : 1)) 
}); 
const initialState = notesAdapter.getInitialState();  

const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    getNotes: build.query({
      query: () => '/notes', 
      validateStatus: 
        (response, result) => (response.status === 200 && !result.isError), 
      transformResponse:  // add id (since mongo uses _id) and normalize
        notes => {
          notes = notes.filter(note => (note !== null));
          const notesWithIDs = notes.map(note => {
            return {...note, id: note._id};
          }); 
          const normalizedNotes = notesAdapter.setAll(initialState, notesWithIDs); 
          return normalizedNotes; 
        }, 
      providedTags: 
        (notes, err, queryArgs) => {
          if (notes?.ids) {
            return [ 
              { type: 'Note', id: 'LIST' }, 
              ...notes.ids.map(noteID => ({ type: 'Note', id: noteID }))
            ]; 
          } else {
            return [{ type: 'Note', id: 'LIST' }];
          }
        },      
    }), 
    addNote: build.query({
      query: (noteData) => ({
        url: "/note", 
        method: "POST", 
        body: noteData
      }), 
      validateStatus: 
        (response, result) => (response.status === 200 && !result.isError), 
    }), 
    patchNote: build.query({
      query: (noteData) => ({
        url: "/notes", 
        method: "PATCH", 
        body: noteData
      }), 
      validateStatus: 
        (response, result) => (response.status === 200 && !result.isError), 
    }), 
    deleteNote: build.query({
      query: (noteID) => ({
        url: "/notes", 
        method: "DELETE", 
        body: { noteID : noteID } 
      }), 
      validateStatus: 
        (response, result) => (response.status === 200 && !result.isError), 
    })
  })
})

export const {
  useGetNotesQuery, useAddNoteQuery
} = notesApiSlice; 

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();  // Why export this one but not the memoized?
const selectNotesData = createSelector(
  selectNotesResult, 
  notes => notes.data, 
)
// Define more selectors here. 

export const {  // Hooks
  selectAll: selectAllNotes, selectById: selectNoteById, selectIds: selectNoteIds  
} = notesAdapter.getSelectors((state) => selectNotesData(state) ?? initialState);

