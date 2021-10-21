import React, {createContext, useReducer} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoadProduct from './components/LoadProduct/LoadProduct';
import ProductsList from './components/ProductsList/ProductsList';
import PageNotFound from './components/PageNotFound/PageNotFound';

import './App.scss';

/**
Componente Inicial que muestra un formulario de Login
Si el usuario se autentifica correctamente se muestra el tiempo trasncurrido desde su último acceso
**/

function App() {
  
  
return <>    
      <Router>
          <Switch>
            <Route exact path="/">
              <LoadProduct />
            </Route>
            <Route exact path="/listado">
              <ProductsList />
            </Route>
            <Route component={PageNotFound} />
          </Switch>
        </Router>   
</> 
}
export default App;
