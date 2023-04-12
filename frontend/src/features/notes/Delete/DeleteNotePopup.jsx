import { useSelector } from "react-redux";
import { selectNoteById, useDeleteNoteMutation, useGetNotesQuery, useGetTreeQuery } from "../notesApiSlice";
import { redirect } from "react-router-dom";

export default function DeleteNotePopup({ noteID }) {
  const { isLoading: isLoadingNote, isError: isErrorNote } = useGetNotesQuery(); 
  const { isLoading: isLoadingTree, isError: isErrorTree, data: tree } = useGetTreeQuery(noteID);
  const note = useSelector((state) => selectNoteById(state, noteID)); 
  const [deleteNote, mutationResult] = useDeleteNoteMutation(); 
  const cancelDeletion = () => console.log("cancel"); 
  const proceedDeletion = () => {  /* Potential pitfall: unchecked async */
    if (isLoadingNote || isErrorNote || isLoadingTree || isErrorTree) 
      return null; 
    console.log("TREE:", tree);
    const sourceID = note.sourceID;
    for (let normalized_id in tree) {
      deleteNote(tree[normalized_id]); 
    }
    redirect(`/sources/${sourceID}`); // make a deleteSuccess component or something. Not working btw.
  }
  return (
    <div className="border-red-600 text-black bg-white border-2 rounded-lg p-4">
      <div className="font-bold text-2xl">Are you sure you want to delete this note?</div>
      <div>This action is <b className="text-red-600">irreversible</b>.</div>
      <div className="flex flex-row-reverse">
        <button onClick={proceedDeletion} className="bg-red-600 rounded-full text-white p-2 ">Delete</button> 
        <button onClick={cancelDeletion} className="border-black hover::bg-color-gray p-2">Cancel</button>
      </div>
    </div>
  )
}