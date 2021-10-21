import React from 'react';

import './ProductsPagination.scss';
/**
Componente que muestra una paginacion simple

 * @param numProducts       - numero total de productos
 * @param pagination        - numero de productos por pagina
 * @param pageSelected      - pagina activa
 * @param change            - funcion que devuelve la pagina pulsada
**/

function ProductsPagination({
    numProducts=0,
    pagination=1,
    pageSelected=1,
    change=()=>{}
}) { 
  
  const paginas = Math.ceil(numProducts / pagination);
  const arrayPaginas = new Array(paginas);

  return <div className="spa-pagination-products-container">
        {arrayPaginas.fill(0,0,paginas).map((elem,index)=><div key={'paginacion-' + index} className={`spa-pagination-products-item ' ${(pageSelected == (index + 1)) ? 'selected' : ''}` } onClick={()=>change(index + 1)}>{index + 1}</div>)}         
    </div>
}

export default ProductsPagination;
