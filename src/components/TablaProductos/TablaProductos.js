import React, { useContext, useState, useMemo } from 'react';
import { Link } from "react-router-dom";
import {listadoProductosMeGusta} from '../../actions/actions';

import PaginacionProductos from './PaginacionProductos'
import MeGusta from './MeGusta';


import './TablaProductos.scss';
/**
Componente que muestra un listado de prodctos

 * @param productos  - array de objetos a mostrar
 * @param productos  - array donde se almacenan los productos que se han seleccionado como me gusta
 * @param paginacion - numero de elementos por pagina
 * @param dispatch   - funcion dispatch
**/

export default function TablaProductos ({
    productos=[],
    productosMeGusta=[],
    paginacion=0,
    dispatch=()=>{}
}) {
  const [pagina, setPagina] = useState(1);

  const numeroProductos = productos.length;

  const productosPaginaMemo = ()=>{    
    const final = pagina * paginacion;
    const elementoFinal = final < numeroProductos ? final : numeroProductos;
    const inicio = final - paginacion;  

    const productoAux = [];
    let indice = 0;
    for (let i=inicio; i<elementoFinal; i++) {
      productoAux[indice++] = productos[i];
    }
    return productoAux;
  }

  const productosPagina = useMemo(productosPaginaMemo, [pagina, productos]);

  const meGusta = (opcion, id)=>{   
    dispatch(listadoProductosMeGusta({id:id, opcion: opcion}))
  };

  const change = (pagina)=>setPagina(pagina);
    
  return <div className="spa-tabla-productos-principal">            
            <div className="spa-tabla-contenedor-productos">
              {productosPagina.map((elem, index)=><div key={"producto" + index} className="spa-tabla-productos-producto">
                <div className="spa-tabla-contenedor-imagen">
                  <img src={elem.imagen}></img>               
                  <MeGusta estadoInicial={productosMeGusta.indexOf(elem.id) != -1} change={(opcion)=>meGusta(opcion, elem.id)}/>
                </div>
                <p className="spa-tabla-productos__nombre">{elem.nombre}</p>
                <p className="spa-tabla-productos__categoria">{elem.categoria}</p>
                <p className="spa-tabla-productos__precio">{elem.precio} €</p>
              </div>)}
              <PaginacionProductos numeroProductos={numeroProductos} paginacion={paginacion} paginaSeleccionada={pagina} change={change}/>
            </div>
          </div>
}