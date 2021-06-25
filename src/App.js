import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CadUnidadeMedida from './Pages/CadUnidadeMedida/CadUnidadeMedida';
import CadUser from './Pages/CadUser/CadUser';
import ListUser from './Pages/ListUser/ListUser';
import Login from './Pages/Login/Login';
import Notfound from './Pages/Notfound/Notfound';
import Loading from "./Components/Loanding/Loanding";
import ListUnidadeMedida from './Pages/ListUnidadeMedida/ListUnidadeMedida';
function App() {
  return (
       <Router>
        <Switch>
        <Route path="/" exact component={Login}/>
            <Route path="/cad_usuario" component={CadUser}/>
            <Route path="/ListUser" component={ListUser}/>
            <Route path="/CadUnidadeMedida" component={CadUnidadeMedida}/>
            <Route path="/ListUnidadeMedida" component={ListUnidadeMedida}/>
            <Route path="/Loading" component={Loading}/>
            <Route path="/*" component={Notfound}/>
        </Switch>
      </Router>
  );
}

export default App;
