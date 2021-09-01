import React, {useContext, useEffect, useRef, useState} from "react";
import cls from "./CitiesAutoComplete.module.scss";
import {weatherContext} from "../../contexts/WeatherContext";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default function CitiesAutoComplete({className, ...rest}) {
  const [sugVis, setSugVis] = useState(false);
  const wrapperRef = useRef(null);
  const {setSelectedSug} = useContext(weatherContext);
  const [address, setAddress] = React.useState("");

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    const contextSugData = {
      coord: {
        lat: latLng.lat,
        lon: latLng.lng,
      },
      id: results[0].place_id,
      name: results[0].formatted_address
    }
    setAddress(value);
    setSelectedSug(contextSugData)
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    address && setSugVis(true)
  }, [address])

  const handleClickOutside = event => {
    const {current: wrap} = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setSugVis(false);
    }
  };

  return (
    <div ref={wrapperRef} className={`${className} ${cls.field_wrapper}`} {...rest}>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
          <div>
            <input {...getInputProps({placeholder: "Find place..."})} />

            {(address && sugVis) && <div className={cls.suggestions}>
              {loading ? <div>...loading</div> : null}
              {suggestions.map((sug) => {
                return (
                  <div key={sug.index}
                       className={`${cls.suggestion} ${sug.active ? cls.active : ""}`}  {...getSuggestionItemProps(sug)}>
                    {sug.description}
                  </div>
                );
              })}
            </div>}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
