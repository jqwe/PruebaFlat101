import React, { useState, useMemo } from 'react';
import {LIST_PRODUCT_I_LIKE} from '../../actions/actions';

import ProductsPagination from './ProductsPagination'
import ILikeIt from './ILikeIt';


import './ProductsTable.scss';
/**
Componente que muestra un listado de prodctos

 * @param products  - array de objetos a mostrar
 * @param products  - array donde se almacenan los productos que se han seleccionado como me gusta
 * @param pagination - numero de elementos por pagina
 * @param dispatch   - funcion dispatch
**/

export default function ProductsTable ({
    products=[],
    productsILike=[],
    pagination=0,
    dispatch=()=>{}
}) {
  const [page, setPage] = useState(1);

  const numProducts = products.length;

  const productsPageMemo = ()=>{    
    const end = page * pagination;
    const lastElement = end < numProducts ? end : numProducts;
    const begin = end - pagination;  

    const productAux = [];
    let index = 0;
    for (let i=begin; i<lastElement; i++) {
      productAux[index++] = products[i];
    }
    return productAux;
  }

  const productsPage = useMemo(productsPageMemo, [page, products]);

  const iLikeIt = (opcion, id)=>{   
    dispatch({type: LIST_PRODUCT_I_LIKE, value: {id, opcion}});
  };

  const change = (page)=>setPage(page);
    
  return <div className="spa-table-products-main">            
            <div className="spa-table-container-products">
              {productsPage.map((elem, index)=><div key={"product" + index} className="spa-table-products-product">
                <div className="spa-table-container-image">
                  <img src={elem.image}></img>               
                  <ILikeIt initialState={productsILike.indexOf(elem.id) != -1} change={(option)=>iLikeIt(option, elem.id)}/>
                </div>
                <p className="spa-table-products__name">{elem.name}</p>
                <p className="spa-table-products__category">{elem.category}</p>
                <p className="spa-table-products__price">{elem.price} €</p>
              </div>)}
              <ProductsPagination numProducts={numProducts} pagination={pagination} pageSelected={page} change={change}/>
            </div>
          </div>
}