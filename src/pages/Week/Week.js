import MainLayout from "../../components/MainLayout/MainLayout";
import {Card} from "@material-ui/core";
import cls from "./Week.module.scss";
import {useContext} from "react";
import {weatherContext} from "../../contexts/WeatherContext";
import {formatDate} from "../../utils/formatDate";
import {InvertColors, Toys} from "@material-ui/icons";

export default function Week() {
  const {
    weather
  } = useContext(weatherContext)

  return (
    <MainLayout>
      <section className={cls.Week}>
        <h1 className='text-center pt-4 border-top'>Week</h1>

        <div className={`${cls.weathers}`}>
          {
            weather && weather.daily.map(({dt, weather: _weather, wind_speed, temp: {max, min}, humidity}, i) => {
              const {icon, main} = _weather[0];
              const date = formatDate(dt);
              return (
                <Card
                  key={dt}
                  className={`full-width pb-2 ${cls.weather} ${i === 0 ? cls.active : ""} ${(date.day === 0 || date.day === 6) ? cls.wknd : ""}`}
                >
                  <div className={`d-flex justify-content-between align-items-center ps-2 full-width`}>
                    <p className='fw-bold m-0'>{date.dayName}</p>
                    <img
                      src={`http://openweathermap.org/img/wn/${icon}.png`}
                      alt="weather-icon"/>
                  </div>
                  <div>
                    <h5
                      className={'fw-bold text-center'}>{`${Math.round((max - 273) * 10) / 10}`}&deg;{`C - ${main}`}</h5>
                    <h6 className={`m-0 text-center`}>{`${date.d}.${date.mon}`}</h6>
                  </div>
                  <div className={`d-flex justify-content-between full-width px-2`}>
                    <div className={cls.desc}>
                      <p className={`m-0 d-flex align-content-center`}><Toys/> {wind_speed} m/s</p>
                      <p className={`m-0 d-flex align-content-center`}><InvertColors/> {humidity} %</p>
                    </div>
                    <div>
                      <p className={`${cls.max} m-0 fw-bold`}>{`${Math.round((max - 273) * 10) / 10}`}&deg;C</p>
                      <p className={`${cls.min} m-0 fw-bold`}>{`${Math.round((min - 273) * 10) / 10}`}&deg;C</p>
                    </div>

                  </div>
                </Card>
              )
            })
          }
        </div>
      </section>
    </MainLayout>
  )
}
