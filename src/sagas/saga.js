import { put, takeLatest, call, all, select } from 'redux-saga/effects'
import {SEND_PRODUCT_OK, SEND_PRODUCT_KO, PRODUCTS_LIST, SEND_PRODUCT, LOADING_PRODUCTS} from '../actions/actions';

const URL_API_PRODUTS = 'http://localhost:3004/products';

function* addProduct() {
    try {
        const state = yield select(); 
        const data = {
            "image": state.imageBase64,
            "name": state.product.name.value,
            "category": state.product.category.value,
            "price": state.product.price.value
          }
          const options = {
                            method: 'post',
                            headers: {
                            'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        }                
          const response = yield call(fetch, URL_API_PRODUTS, options);          
          yield put({ type: SEND_PRODUCT_OK });     
    } catch {
        yield put({ type: SEND_PRODUCT_KO });     
    }
}

function* listProducts() {         
    const response = yield call(fetch, URL_API_PRODUTS);    
    const data = yield call([response, 'json'])
    yield put({ type: PRODUCTS_LIST, value: data });
}

function* addProductWatcher() {
    yield takeLatest(SEND_PRODUCT, addProduct);  
}
  
function* listProductsWatcher() {    
    yield takeLatest(LOADING_PRODUCTS, listProducts);    
}  
  
export default function* rootSaga() {
    yield all([     
      listProductsWatcher(),
      addProductWatcher()
    ])
}