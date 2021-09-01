import "./MainLayout.scss"
import MainLayoutHeader from "./MainLayoutHeader";
import {Button} from "@material-ui/core";
import {Add, Toys} from "@material-ui/icons";
import CitiesAutoComplete from "../CitiesAutoComplete/CitiesAutoComplete";
import {useContext} from "react";
import {weatherContext} from "../../contexts/WeatherContext";
import {getQueryPrms} from "../../utils/getQueryPrms";
import {safePlace} from "../../utils/safeRemovePlaces";
import {toast} from "react-toastify";

function handleSafePlace(e, id) {
  e.preventDefault();
  const queries = getQueryPrms();
  if (id || queries.id) {
    safePlace(id || queries.id)
  }else{
    toast.error('before adding a place, please specify a place using the "Find place ..." field', {autoClose: 10000})
  }
}

export default function MainLayout({children}) {
  const {weather, coords} = useContext(weatherContext);
  const currentW = weather?.current;
  const temp = currentW ? Math.round((currentW.temp - 273) * 100) / 100 : '---';

  return (
    <>
      <MainLayoutHeader/>
      <main className='container main-wrapper__main pb-5'>
        <div className='default-weather d-flex justify-content-md-end justify-content-between pb-3 pb-md-0'>
          <CitiesAutoComplete className='d-flex d-md-none' id="mobile-auto-complete"/>
          <Button onClick={e => handleSafePlace(e, coords.id)} className='default-weather__add-new-city ms-3 ms-md-0' variant='outlined'>
            <Add color='inherit'/> Safe City
          </Button>
        </div>
        <div className='text-center'>
          {weather && <div className='d-flex align-items-center justify-content-center mb-1'>
            <img src={`http://openweathermap.org/img/wn/${currentW?.weather[0].icon}.png`} alt=""/>
            <div className='text-start'>
              <h6 className='m-0'>{currentW?.weather[0].main}</h6>
              <p className={'m-0'}>{currentW?.weather[0].description}</p>
            </div>
          </div>}
          <h4>{temp} &deg;C</h4>
          <p className='m-0 fw-bold'>{coords?.name ? coords.name : weather?.timezone}</p>
          {
            weather &&
            <p className='text-center pb-3'><Toys/> - {Math.round(currentW?.wind_speed * 10) / 10} meter per second</p>
          }
        </div>
        {children}
      </main>
    </>
  )
}
