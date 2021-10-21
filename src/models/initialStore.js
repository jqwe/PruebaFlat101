import {productState} from './productState';
export const initialStore = {
    productState : JSON.parse(JSON.stringify(productState)),
    product: JSON.parse(JSON.stringify(productState)),
    imageBase64: '',
    productLoading: false,
    sendProductError: false,
    activeButtonNewProduct: false,
    productsList: [],
    loadingProducts: true,
    produtsListILike: []
}