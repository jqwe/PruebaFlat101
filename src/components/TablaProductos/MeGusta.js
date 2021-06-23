import React, { useContext, useState, useMemo } from 'react';
import { Link } from "react-router-dom";
import { faHeart, faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MeGusta.scss';
/**
Componente que muestra un icono de corazon para pulsar para indicar que ese producto te gusta
 * @param estadoInicial  - boolean: indica si se ha pulsado o no
 * @param change         - funcion que devuelve al padre si se ha pulsado
**/

export default function MeGusta({
    estadoInicial,
    change
}) {
  const [meGusta, setMegusta] = useState(estadoInicial);  

 

  const meGustaClick = ()=>{
    change(!estadoInicial);    
  };  
    
  return <div className='spa-tabla-producto__circulo'><FontAwesomeIcon icon={faHeart} className={estadoInicial ? 'spa-me-gusta' : 'spa-no-me-gusta'} onClick={meGustaClick}/></div>
                
}