import './App.css';
import {BrowserRouter as Router, Route, Routes, Redirect} from 'react-router-dom';
import Users from './users/pages/Users';
import NewPlaces from './places/pages/NewPlaces';
import MainHeader from './shared/componets/Navigation/MainHeader';
import MainNavigation from './shared/componets/Navigation/MainNavigation';
function App() {
  return (
    <Router>
      <MainNavigation/>
      <main>
      <Routes>
       <Route path='/' exact element ={ <Users/>} />
       <Route path='/places/new' exact element ={ <NewPlaces/>} />
      </Routes>
      </main>
    </Router>
  );
}

export default App;
