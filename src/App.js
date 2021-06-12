import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './Components/NavBar/NavBar';
import CadUser from './Pages/CadUser/CadUser';
import ListUser from './Pages/ListUser/ListUser';
import Login from './Pages/Login/Login';
import Notfound from './Pages/Notfound/Notfound';
function App() {
  return (
       <Router>
        <NavBar />
        <Switch>
        <Route path="/" exact component={Login}/>
            <Route path="/cad_usuario" component={CadUser}/>
            <Route path="/ListUser" component={ListUser}/>
            <Route path="/ListUser" component={ListUser}/>
            <Route path="/*" component={Notfound}/>
        </Switch>
      </Router>
  );
}

export default App;
