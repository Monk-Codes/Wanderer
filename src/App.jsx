import { useCallback, useEffect, useRef, useState } from "react";
import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import { sortPlacesByDistance } from "./loc.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
//////////////////////////////////////////////////////
//declaring stored places//
const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map((id) => AVAILABLE_PLACES.find((place) => place.id === id));
///////////////////////////////////////////////////////
function App() {
 const [modalOpen, setModalOpen] = useState(false);
 const selectedPlace = useRef();
 const [pickedPlaces, setPickedPlaces] = useState([]);
 const [availablePlaces, setAvailablePlaces] = useState([]);
 ////////////////////////////////////////////////////////
 //will use after getting location from user's browser
 useEffect(() => {
  navigator.geolocation.getCurrentPosition((position) => {
   const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
   setAvailablePlaces(sortedPlaces);
  });
 }, []);
 /////////////////////////////////////////////////
 function handleStartRemovePlace(id) {
  setModalOpen(true);
  selectedPlace.current = id;
 }

 function handleStopRemovePlace() {
  setModalOpen(false);
 }

 function handleSelectPlace(id) {
  setPickedPlaces((prevPickedPlaces) => {
   if (prevPickedPlaces.some((place) => place.id === id)) {
    return prevPickedPlaces;
   }
   const place = AVAILABLE_PLACES.find((place) => place.id === id);
   return [place, ...prevPickedPlaces];
  });
  const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
  if (storedIds.indexOf(id) === -1) {
   localStorage.setItem("selectedPlaces", JSON.stringify([id, ...storedIds]));
  }
 }

 const handleRemovePlace = useCallback(function handleRemovePlace() {
  setPickedPlaces((prevPickedPlaces) => prevPickedPlaces.filter((place) => place.id !== selectedPlace.current));
  setModalOpen(false);
  const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
  localStorage.setItem("selectedPlaces", JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)));
 }, []);

 ////////////////////////////////////////////////////////////////

 return (
  <>
   <Modal open={modalOpen} onClose={handleStopRemovePlace}>
    {modalOpen && <DeleteConfirmation onCancel={handleStopRemovePlace} onConfirm={handleRemovePlace} />}
   </Modal>

   <header>
    <img src={logoImg} alt="Stylized globe" />
    <h1>Wanderer🌏</h1>
    <p>Create your personal collection of places📍 you would like to visit or you have visited.</p>
   </header>
   <main>
    <Places title="I'd like to visit ..." fallbackText={"Select the places you would like to visit below."} places={pickedPlaces} onSelectPlace={handleStartRemovePlace} />
    <Places title="Famous Nearby Places" places={availablePlaces} fallbackText="Sorting Places by Distance" onSelectPlace={handleSelectPlace} />
   </main>
  </>
 );
}

export default App;
