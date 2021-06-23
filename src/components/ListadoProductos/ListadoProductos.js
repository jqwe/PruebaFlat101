import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {listadoProductos, listadoProductosError, listadoProductosEnviando} from '../../actions/actions';
import {listaDeProductos, } from '../../services/services';
import TablaProductos from '../TablaProductos/TablaProductos';


import './ListadoProductos.scss';
/**
Componente que muestra un listado de productos

 * @param contexto  - contexto de la aplicacion con el estado
 * 
**/

export default function ListadoProductos ({
    contexto
}) {
  const {state, dispatch} = useContext(contexto);
 
  useEffect(() => {
    dispatch(listadoProductosEnviando);
    listaDeProductos((resp)=>dispatch(listadoProductos(resp)),()=>dispatch(listadoProductosError()));    
  }, []);
    
  return <div className="spn-react-listado-productos">
     {state.listadoProductosEnviando ? <div>Cargando productos</div>
                                     : <>
                                        <div className="spa-tabla-productos-total">{state.listadoProductos.length} Productos encontrados</div>
                                        <TablaProductos productos={state.listadoProductos} productosMeGusta={state.listadoProductosMeGusta} paginacion={6} dispatch={dispatch}/> 
                                       </>
                                      }                                      
                            
    </div>
}