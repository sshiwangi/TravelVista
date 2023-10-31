import './App.css';
import {BrowserRouter as Router, Route, Routes, Redirect} from 'react-router-dom';
import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainHeader from './shared/componets/Navigation/MainHeader';
import MainNavigation from './shared/componets/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';

function App() {
  return (
    <Router>
      <MainNavigation/>
      <main>
      <Routes>
       <Route path='/' exact element ={ <Users/>} />
       <Route path='/places/new' exact element ={ <NewPlace/>} />
       <Route path='/:userId/places' exact element ={ <UserPlaces/>} />
       <Route path='/places/:placeId' exact element ={ <UpdatePlace/>} />
      </Routes>
      </main>
    </Router>
  );
}

export default App;
