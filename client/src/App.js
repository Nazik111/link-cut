import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import s from './App.css'
import {useRoutes} from './routes'
import {BrowserRouter as Router} from 'react-router-dom'
import 'materialize-css'
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./Components/Navbar/Navbar";
import {Loader1} from "./Components/Loader/Loader1";


function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated);

if (!ready) {
    return <Loader1/>
}
    return (
      <div className={s.app_wrapper}>
<AuthContext.Provider value={{
    token, login, logout, userId, isAuthenticated
}}>
          <Router>
              {isAuthenticated && <Navbar/>}
    {routes}
</Router>
</AuthContext.Provider>
      </div>
)
}

export default App;
