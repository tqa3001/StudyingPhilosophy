import { useSelector } from "react-redux";
import { selectNoteById, useDeleteNoteMutation, useGetNotesQuery, useGetTreeQuery } from "../notesApiSlice";

export default function DeleteNotePopup({ noteID }) {
  const { isLoading: isLoadingNote, isError: isErrorNote } = useGetNotesQuery(); 
  const { isLoading: isLoadingTree, isError: isErrorTree, data: tree } = useGetTreeQuery(noteID);
  const note = useSelector((state) => selectNoteById(state, noteID)); 
  const [deletor, mutationResult] = useDeleteNoteMutation(); 
  const cancelDeletion = () => console.log("cancel"); 
  const proceedDeletion = () => {  /* Potential pitfall: unchecked async */
    if (isLoadingNote || isErrorNote || isLoadingTree || isErrorTree) return null; 
    console.log("TREE:", tree); 
  }
  return (
    <div className="border-red-600 bg-white border-2 rounded-lg p-4">
      <div className="font-bold text-2xl">Are you sure you want to delete this note?</div>
      <div>This action is <b className="text-red-600">irreversible</b>.</div>
      <div className="flex flex-row-reverse">
        <button onClick={proceedDeletion} className="bg-red-600 rounded-full text-white p-2 ">Delete</button> 
        <button onClick={cancelDeletion} className="border-black hover::bg-color-gray p-2">Cancel</button>
      </div>
    </div>
  )
}