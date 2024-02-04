import { useEffect } from "react";
import ProgressBar from "./ProgressBar";
const timer = 5000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
 ////////////Auto timeout/////////////////////////
 useEffect(() => {
  const t = setTimeout(() => {
   onConfirm();
  }, 3000);
  return () => {
   clearTimeout(t);
  };
 }, [onConfirm]);
 ////////////////////////////////////////////////////////
 return (
  <div id="delete-confirmation">
   <h2>Are you sure?</h2>
   <p>Do you really want to remove this place?</p>
   <div id="confirmation-actions">
    <button onClick={onCancel} className="button-text">
     No
    </button>
    <button onClick={onConfirm} className="button">
     Yes
     <ProgressBar timer={timer} />
    </button>
   </div>
  </div>
 );
}
