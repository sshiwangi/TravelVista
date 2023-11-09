import React, { Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import Users from "./users/pages/Users";
// import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/componets/Navigation/MainNavigation";
// import UserPlaces from "./places/pages/UserPlaces";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/componets/UIElements/LoadingSpinner";

const Users = React.lazy(() => import("./users/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./users/pages/Auth"));

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" exact element={<Users />} />
        <Route path="/:userId/places" exact element={<UserPlaces />} />
        <Route path="/places/new" exact element={<NewPlace />} />
        <Route path="/places/:placeId" exact element={<UpdatePlace />} />
        <Route path="/auth" exact element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" exact element={<Users />} />
        <Route path="/:userId/places" exact element={<UserPlaces />} />
        <Route path="/auth" exact element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
