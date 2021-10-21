import React, { useEffect } from 'react';
import {LOADING_PRODUCTS} from '../../actions/actions';
import ProductsTable from '../ProductsTable/ProductsTable';
import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';

import './ProductsList.scss';
/**
Componente que muestra un listado de productos
**/

export default function ProductsList () {
  const { t } = useTranslation();

  const state = useSelector(state => state);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch({type: LOADING_PRODUCTS});    
  }, []);
    
  return <div className="spn-react-list-products">
     {state.loadingProducts ? <div>{t('loading_load_products')}</div>
                                     : <>
                                        <div className="spa-table-products-total">{state.productsList.length} {t('products_found_text')}</div>
                                        <ProductsTable products={state.productsList} productsILike={state.produtsListILike} pagination={6} dispatch={dispatch}/> 
                                       </>
                                      }                                      
                            
    </div>
}