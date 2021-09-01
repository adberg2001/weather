import {NavLink} from "react-router-dom";
import {Button} from "@material-ui/core";
import CitiesAutoComplete from "../CitiesAutoComplete/CitiesAutoComplete";

export default function MainLayoutHeader() {
  const currentDate = new Date();
  const nextDate = new Date();
  nextDate.setDate(currentDate.getDate() + 1);
  const todayTime = Math.floor(currentDate.getTime() / 100000) * 100;
  const tomorrowTime = Math.floor(nextDate.getTime() / 100000) * 100;

  return (
    <header className='main-wrapper__header d-flex align-items-end justify-content-between container'>
      <nav className='d-flex align-items-end full-width'>
        <ul className={`d-flex align-items-center justify-content-between justify-content-sm-start full-width`}>
          <li>
            <NavLink exact to='/' activeClassName='active-link'>
              <Button className='px-1 py-0 px-md-2'>Home</Button>
            </NavLink>
          </li>
          <li>
            <NavLink exact to={`/certain/${todayTime}`} activeClassName='active-link'>
              <Button className='px-1 py-0 px-md-2'>Today</Button>
            </NavLink>
          </li>
          <li>
            <NavLink exact to={`/certain/${tomorrowTime}`} activeClassName='active-link'>
              <Button className='px-1 py-0 px-md-2'>Tomorrow</Button>
            </NavLink>
          </li>
          <li>
            <NavLink exact to='/week' activeClassName='active-link'>
              <Button className='px-1 py-0 px-md-2'>Week</Button>
            </NavLink>
          </li>
        </ul>
      </nav>
      <CitiesAutoComplete className='d-none d-md-flex' id='desktop-autocomplete'/>
    </header>
  )
}
