import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../sagas/saga';

import {productState} from '../models/productState';
import {initialStore} from '../models/initialStore';
import {IMAGE_BASE_64, UPDTATE_PRODUCT, SEND_PRODUCT_OK, SEND_PRODUCT_KO, PRODUCTS_LIST, NEW_PRODUCT, 
        LOADING_PRODUCTS, ERROR_PRODUCT_REQUIRED, SENT_PRODUCT, LIST_PRODUCT_I_LIKE} from '../actions/actions';

const reducer = (state = initialStore, action) => {        
    switch (action.type) {
        case IMAGE_BASE_64 : {
          return {...state, imageBase64: action.value}                 
        }

        case UPDTATE_PRODUCT : {
          const name = action.value.name;
          let product = {...state.product};
          product[name] = {...product[name], value: action.value.value, error: action.value.error};
          return {...state,  product: {...product}}
        }

        case SENT_PRODUCT : {
          return {...state, productLoading: true, sendProductError: false}          
        }

        case SEND_PRODUCT_OK : {          
          return {...state, productLoading: false, productState: JSON.parse(JSON.stringify(productState)), activeButtonNewProduct: true}          
        }

        case SEND_PRODUCT_KO : {
          return {...state, sendProductError: true}          
        }

        case NEW_PRODUCT : {
          return {...state, product: JSON.parse(JSON.stringify(productState)), activeButtonNewProduct: false, imageBase64: null}          
        }

        case ERROR_PRODUCT_REQUIRED : {
          const name = action.value;
          let product = {...state.product};
          product[name] =  {...product[name], error: {required: true, format: product[name].error.format}};
          return {...state,  product: {...product}}         
        }

        case LOADING_PRODUCTS : {
          return {...state, loadingProducts : true}          
        }

        case PRODUCTS_LIST : {
          return {...state, productsList : action.value, loadingProducts : false}          
        }

        case LIST_PRODUCT_I_LIKE : {
          const productListILike = [...state.produtsListILike]
          if (action.value.opcion) {
            productListILike.push(action.value.id);
          } else {
            const index = productListILike.indexOf(action.value.id);
            productListILike.splice(index, 1);
          }
          return {...state, produtsListILike: [...productListILike]}
        }

    }  
    return {...state}; 
  }

  const sagaMiddleware=createSagaMiddleware();
  export default createStore(reducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);