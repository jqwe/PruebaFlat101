import React, {createContext, useReducer} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CargaProductos from './components/CargaProductos/CargaProductos';
import ListadoProductos from './components/ListadoProductos/ListadoProductos';
import PaginaNoEncontrada from './components/PaginaNoEncontrada/PaginaNoEncontrada';
import {storeInicial} from './models/storeInicial';
import {reducer} from './reducers/reducer';
import './App.scss';

/**
Componente Inicial que muestra un formulario de Login
Si el usuario se autentifica correctamente se muestra el tiempo trasncurrido desde su último acceso
**/

function App() {
  
  const AppContext = createContext();  
  
  const AppContextProvider = props => {
           
    const [state, dispatch] = useReducer(reducer, storeInicial);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AppContext.Provider>
    );
};   

return <>
    <AppContextProvider >
      <Router>
          <Switch>
            <Route exact path="/">
              <CargaProductos contexto={AppContext}/>
            </Route>
            <Route exact path="/listado">
              <ListadoProductos contexto={AppContext}/>
            </Route>
            <Route component={PaginaNoEncontrada} />
          </Switch>
        </Router>      
       
    </AppContextProvider>
</> 
}
export default App;
