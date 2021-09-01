import {createContext, useEffect, useReducer, useState} from "react";
import {
  fetchWeatherError,
  fetchWeatherLoading,
  fetchWeatherSuccess,
  setWeatherIcon
} from "./contextTypes";
import axios from "axios";
import {API_KEY_1, BASE_URL} from "../api/api";
import {getQueryPrms} from "../utils/getQueryPrms";
import {geocodeByPlaceId, getLatLng} from "react-places-autocomplete";
import {toast} from "react-toastify";

export const weatherContext = createContext(null);

const navigationOption = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 5000
};

function onNavigationError(err) {
  toast.warn(`ERROR(${err.code}): ${err.message}`, {autoClose: 2000});
  toast.error(`Turn on geolocation and reload page for full site functionality`,{autoClose: 10000});
}

const INIT_STATE = {
  icon: null,
  error: null,
  loading: false,
  success: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case fetchWeatherSuccess:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case fetchWeatherError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case fetchWeatherLoading:
      return {
        ...state,
        loading: true,
      };
    case setWeatherIcon:
      return {
        ...state,
        icon: action.payload,
      };
    default:
      return state;
  }
};

export default function WeatherProvider({children}) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const startLoading = () => dispatch({type: fetchWeatherLoading});
  const [suggestion, setSelectedSug] = useState(null);
  const [coords, setCoords] = useState(null)

  function onNavigationSuccess(pos) {
    window.location.href = `${window.location.pathname}?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
  }

  async function getPlaceDataByID(query) {
    if (query.id) {
      const placeById = await geocodeByPlaceId(query.id);
      const latLng = await getLatLng(placeById[0]);
      setCoords({lat: latLng.lat, lon: latLng.lng, id: query.id, name: placeById[0]?.formatted_address});
    } else {
      setCoords({lat: query.lat, lon: query.lon, id: query.id, name: undefined});
    }
  }

  useEffect(() => {
    const query = getQueryPrms();
    if (!query?.id && !(query?.lat && query?.lon)) {
      navigator.geolocation.getCurrentPosition(onNavigationSuccess, onNavigationError, navigationOption);
    } else {
      getPlaceDataByID(query);
    }
  }, []);

  useEffect(() => {
    if (suggestion) {
      window.location.href = `${window.location.pathname}?lat=${suggestion.coord.lat}&lon=${suggestion.coord.lon}&id=${suggestion?.id}`
    }
  }, [suggestion]);

  const fetchWeather = async () => {
    startLoading();
    try {
      const {data} = await axios.get(`${BASE_URL}`, {
        params: {
          lat: coords.lat,
          lon: coords.lon,
          exclude: 'minutely',
          appid: API_KEY_1,
        },
      });
      dispatch({type: fetchWeatherSuccess, payload: data});
    } catch (error) {
      dispatch({type: fetchWeatherError, payload: error});
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [coords]);

  return (
    <weatherContext.Provider
      value={{
        fetchWeather,
        startLoading,
        weather: state.success,
        onNavigationSuccess,
        onNavigationError,
        navigationOption,
        coords,
        setSelectedSug
      }}
    >
      {children}
    </weatherContext.Provider>
  )
}
