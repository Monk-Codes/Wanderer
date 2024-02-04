import { useState, useEffect } from "react";

export default function ProgressBar({ timer }) {
 const [timeRemain, setTimeRemain] = useState(timer);
 ///////////progress Bar////////////////////////
 useEffect(() => {
  const i = setInterval(() => {
   setTimeRemain((prevTime) => prevTime - 10);
  }, 10);
  return () => {
   clearInterval(i);
  };
 }, []);

 return <progress value={timeRemain} max={timer} />;
}
