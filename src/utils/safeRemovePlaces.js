import {toast} from "react-toastify";

export function safePlace(place_id) {
  toast.info('the process of adding place', {autoClose: 2000});
  const savedPlaces = JSON.parse(window.localStorage.getItem('places'));
  if (!savedPlaces.includes(place_id)) {
    const collectPlaces = savedPlaces?.length ? [place_id, ...savedPlaces] : [place_id];
    window.localStorage.setItem('places', JSON.stringify(collectPlaces));
    window.location.reload();
  } else {
    toast.warn('you have already added this place');
  }
}

export function removePlace(place_id) {
  toast.info('the process of removing place', {autoClose: 2000});
  const savedPlaces = JSON.parse(window.localStorage.getItem('places'));
  const removedCollection = savedPlaces.filter(savedPlace => savedPlace !== place_id);
  window.localStorage.setItem('places', JSON.stringify(removedCollection));
  window.location.reload();
}
