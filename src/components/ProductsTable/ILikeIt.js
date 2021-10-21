import React from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ILikeIt.scss';
/**
Componente que muestra un icono de corazon para pulsar para indicar que ese producto te gusta
 * @param initialState  - boolean: indica si se ha pulsado o no
 * @param change         - funcion que devuelve al padre si se ha pulsado
**/

export default function ILikeIt({
    initialState,
    change
}) {
  
  const iLikeItClick = ()=>{
    change(!initialState);    
  };  
    
  return <div className='spa-table-circle'><FontAwesomeIcon icon={faHeart} className={initialState ? 'spa-like' : 'spa-dont-like'} onClick={iLikeItClick}/></div>
                
}