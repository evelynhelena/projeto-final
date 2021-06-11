import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './Components/NavBar/NavBar';
import CadUser from './Pages/CadUser/CadUser';
import Login from './Pages/Login/Login';
function App() {
  return (



       <Router>
        <NavBar />
        <Switch>
        <Route path="/" exact component={Login}/>
            <Route path="/cad_usuario" component={CadUser}/>
        </Switch>
      </Router>
  );
}

export default App;
