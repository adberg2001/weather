import MainLayout from "../../components/MainLayout/MainLayout";
import {Card} from "@material-ui/core";
import cls from "./Home.module.scss";
import {useEffect, useState} from "react";
import {geocodeByPlaceId, getLatLng} from "react-places-autocomplete";
import {Delete} from "@material-ui/icons";
import {removePlace} from "../../utils/safeRemovePlaces";

export default function Home() {
  const [savedPLaces, setSavedPlaces] = useState([])
  const savedPlacesId = JSON.parse(window.localStorage.getItem('places'));

  useEffect(() => {
    if (savedPlacesId?.length) {
      setSavedPlaces([])
      savedPlacesId.forEach(async (pId) => {
        const placeById = await geocodeByPlaceId(pId);
        const latLng = await getLatLng(placeById[0]);
        const placeData = {
          id: placeById[0].place_id,
          name: placeById[0].formatted_address,
          lat: latLng.lat,
          lon: latLng.lng
        };
        setSavedPlaces(state => ([...state, placeData]))
      })
    }
  }, [])

  return (
    <MainLayout>
      <section className={`${cls.home} border-top pt-4`}>
        <h1 className='text-center fs-1 mb-5'>Saved cities</h1>
        <div className={cls.cities}>
          {
            !!savedPLaces?.length ?
              savedPLaces.map(({id, name, lat, lon}) => (
                <Card key={id} className={cls.city}>
                  <Delete onClick={() => removePlace(id)}/>
                  <a href={`/?lat=${lat}&lon=${lon}&id=${id}`}>{name}</a>
                </Card>
              )) :
              <Card className={cls.city}>
                <p className='m-0 fw-bold'>No saved place</p>
              </Card>
          }
        </div>
      </section>
    </MainLayout>
  )
}
