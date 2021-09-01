import MainLayout from "../../components/MainLayout/MainLayout";
import {MyMapComponent} from "../../components/map/Map";
import cls from "./CertainDate.module.scss";
import {useContext} from "react";
import {weatherContext} from "../../contexts/WeatherContext";
import {formatDate} from "../../utils/formatDate";
import {Toys} from "@material-ui/icons";

export default function CertainDate(props) {
  const {date} = props.computedMatch.params;
  const formattedDate = formatDate(date);
  const {
    weather,
    coords
  } = useContext(weatherContext);

  const certainDateWeather = weather ? weather.hourly.filter(hWeather => {
    return formatDate(hWeather.dt).d === formattedDate.d
  }) : [];

  const mapProps = certainDateWeather.length ? {
    main: certainDateWeather[0].weather[0].main,
    icon: certainDateWeather[0].weather[0].icon,
    wind_speed: certainDateWeather[0].wind_speed,
    temp: Math.round((certainDateWeather[0].temp - 273) * 100) / 100,
    timezone: coords.name ? coords.name : weather?.timezone,
  } : null;

  return (
    <MainLayout>
      <section className={`pt-4 border-top full-height ${cls.Today}`}>
        <div className='full-width mb-3 mb-md-0'>
          <h1 className='text-center text-md-start'>Today</h1>
          {weather &&
          <p className='text-center text-md-start'>{`${formattedDate.monName}, ${formattedDate.d}`}</p>
          }

          <div className={cls.table_wrapper}>
            <table cellPadding="5" className='full-width'>
              <thead>
              <tr className='border-bottom'>
                <th width='55'>Time</th>
                <th>Weather</th>
              </tr>
              </thead>
              <tbody>
              {
                certainDateWeather.map(({dt, weather, temp, wind_speed}) => {
                  const date = formatDate(dt)
                  const {icon, main} = weather[0]
                  return (
                    <tr key={dt} className={cls.weather_row}>
                      <td>
                        <h6 className='m-0'>{`${date.h}:${date.min}`}</h6>
                      </td>
                      <td className={cls.weather_spec}>
                        <img
                          src={`http://openweathermap.org/img/wn/${icon}.png`}
                          alt="weather-icon"/>
                        <p className='m-0 fw-bold'>{`${Math.round((temp - 273) * 10) / 10}`}&deg;C - {main}</p>
                        <p className='m-0'><Toys/> {wind_speed} m/s</p>
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </div>
        </div>
        <div className={`full-width ps-md-3 ${cls.map_wrapper}`}>
          {coords && <MyMapComponent lat={Number(coords.lat)}
                                     lng={Number(coords.lon)} mapProps={mapProps}/>}
        </div>
      </section>
    </MainLayout>
  )
}
