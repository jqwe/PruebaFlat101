import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import PaginacionProductos from './PaginacionProductos'


import './PaginacionProductos.scss';
/**
Componente que muestra una paginacion simple

 * @param numeroProductos    - numero total de productos
 * @param paginacion         - numero de productos por pagina
 * @param paginaSeleccionada - pagina activa
 * @param change             - funcion que devuelve la pagina pulsada
**/

function TablaProductos({
    numeroProductos=0,
    paginacion=1,
    paginaSeleccionada=1,
    change=()=>{}
}) { 
  
  const paginas = Math.ceil(numeroProductos / paginacion);
  const arrayPaginas = new Array(paginas);

  return <div className="spa-paginacion-productos-contenedor">
        {arrayPaginas.fill(0,0,paginas).map((elem,index)=><div key={'paginacion-' + index} className={`spa-paginacion-productos-elemento ' ${(paginaSeleccionada == (index + 1)) ? 'seleccionado' : ''}` } onClick={()=>change(index + 1)}>{index + 1}</div>)}         
    </div>
}

export default TablaProductos;
