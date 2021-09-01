import {useEffect, useState} from "react";
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import {mapStyles} from "./mapStyles";
import {compose, withProps} from "recompose";
import "./map.scss";

export const MyMapComponent =
  compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js&libraries=geometry,drawing,places&key=${process.env.REACT_APP_WEATHER_MAP_API_KEY}`,
    loadingElement: <div style={{height: `100%`}}/>,
    containerElement: <div style={{height: `100%`}}/>,
    mapElement: <div style={{height: `100%`}}/>,
  }), withScriptjs, withGoogleMap)
(({lat, lng, mapProps}) => {
    const [openInfo, setOpenInfo] = useState(false);
    useEffect(() => {
      const listener = e => {
        if (e.key === "Escape") {
          setOpenInfo(false);
        }
      };
      window.addEventListener("keydown", listener);

      return () => {
        window.removeEventListener("keydown", listener);
      };
    }, []);

    return (
      <GoogleMap
        defaultZoom={9}
        defaultCenter={{lat, lng}}
        defaultOptions={{styles: mapStyles}}
      >
        {mapProps && <Marker position={{lat, lng}} onClick={() => setOpenInfo(true)}>
          {
            openInfo &&
            <InfoWindow onCloseClick={() => setOpenInfo(false)}>
              <div className='map_info'>
                <div className='d-flex mb-1'>
                  <img src={`http://openweathermap.org/img/wn/${mapProps.icon}.png`} alt=""/>
                  <div>
                    <p className='m-0'>{mapProps.main}</p>
                    <h6>{mapProps.temp} &deg;C</h6>
                  </div>
                </div>
                <p className='m-0 fw-bold'>{mapProps.timezone}</p>
              </div>
            </InfoWindow>
          }
        </Marker>}
      </GoogleMap>
    )
  }
);
