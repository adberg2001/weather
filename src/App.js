import {BrowserRouter, Switch} from "react-router-dom";
import Home from "./pages/Home/Home";
import CertainDate from "./pages/CertainDate/CertainDate";
import Week from "./pages/Week/Week";
import WeatherProvider from "./contexts/WeatherContext";
import NotFound from "./pages/NotFound";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <WeatherProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Switch>
          <Home path='/' exact={true}/>
          <CertainDate path='/certain/:date' exact={true}/>
          <Week path='/week' exact={true}/>
          <NotFound path='*'/>
        </Switch>
      </BrowserRouter>
    </WeatherProvider>
  );
}

export default App;
