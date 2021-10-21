import React from 'react';
import { Link } from "react-router-dom";

import Form from '../Form/Form/Form';
import FieldText from '../Form/FieldText/FieldText';
import FieldFile from '../Form/FieldFile/FieldFile';
import {validateMaxSizeFile, validateExtension, validateNumeric} from '../Form/validators';
import {SEND_PRODUCT, NEW_PRODUCT, IMAGE_BASE_64, UPDTATE_PRODUCT, ERROR_PRODUCT_REQUIRED} from '../../actions/actions';
import {MAX_IMAGE_FILE} from '../../constants/constants';
import {useTranslation} from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import './LoadProduct.scss';

/**
Componente que presenta un formulario para la carga de productos 
**/

export default function LoadProducts() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  
  const { t } = useTranslation();

  const onSubmit = ()=> {    
    dispatch({type: SEND_PRODUCT});    
  }

  const convertImageToBase64 = (image)=>{
    if (image) {
      var reader = new FileReader();
      reader.onloadend = function() {   
        dispatch({type: IMAGE_BASE_64, value: reader.result});
      }
      reader.readAsDataURL(image);
    } else {
      dispatch({type: IMAGE_BASE_64, value: null});
    }    
  }
 
  const newProduct = ()=>{   
    dispatch({type: NEW_PRODUCT});
  }
    
  return <div className="">      
     <div className="spn-react-send-products">     
      <div className="spn-react-send-products-container">        
        <h2>{t('page_load_product_title')}</h2>
         {!state.productLoading 
         ? <Form contex={state.product}  errorRequerired={(key)=>dispatch({type: ERROR_PRODUCT_REQUIRED, value: key})} onSubmit={onSubmit} 
            fields={
              <div className="spn-container-fields-form">
                <div className="spn-preview-image">
                    {state.imageBase64 && <img src={state.imageBase64}></img>}
                </div>
                <div className="react-field">
                  <FieldFile                
                    placeholder = ''
                    label = {t('label_image')}
                    labelModify = {t('image_label_change')}
                    name='image'                                               
                    required={state.product.image.rules.required}               
                    requiredError = {t('image_error')}
                    value={state.product.image.value}
                    maxSize={MAX_IMAGE_FILE}
                    allowedExtensions={['png', 'jpg', 'JPG', 'PNG']}
                    error={state.product.image.error.required}
                    disabled={state.activeButtonNewProduct} 
                    validators = {[
                      {validator: validateMaxSizeFile, messageError: t('max_image_file_error')},
                      {validator: validateExtension, messageError: t('error_ext_image')}                                                      
                    ]}                                    
                    onChange = {({name, value, error})=>{     
                        dispatch({type: UPDTATE_PRODUCT, value: {name, value, error}});               
                        if (!error.requerido && !error.formato) {
                          convertImageToBase64(value);
                        } else  {
                          dispatch({type: IMAGE_BASE_64, value: null});
                        }          
                    }
                    }
                  
                  />
                </div>
                <div className="react-field">
                  <FieldText                              
                    placeholder = ''
                    label = {t('label_name')}                   
                    name='name'                                              
                    required={state.product.name.rules.required}               
                    requiredError = {t('name_error_required')}
                    value={state.product.name.value}
                    error={state.product.name.error.required}
                    disabled={state.activeButtonNewProduct}                                  
                    onChange = {({name, value, error})=>dispatch({type: UPDTATE_PRODUCT, value: {name, value, error}})}                  
                  />
                </div>
                <div className="react-field">
                  <FieldText      
                    label= {t('label_category')}
                    placeholder = ''
                    name='category'                                               
                    required={state.product.category.rules.required}               
                    requiredError = {t('category_error_required')}
                    value={state.product.category.value}
                    error={state.product.category.error.required}
                    disabled={state.activeButtonNewProduct}                                                
                    onChange = {({name, value, error})=>dispatch({type: UPDTATE_PRODUCT, value: {name, value, error}})}         
                  />
                </div> 
                <div className="react-field">
                  <FieldText
                    label={t('label_price')} 
                    placeholder = ''
                    name= 'price'                        
                    required={state.product.price.rules.required}               
                    requiredError = {t('price_error_required')}
                    value={state.product.price.value}
                    error={state.product.price.error.required}
                    disabled={state.activeButtonNewProduct}
                    validators={[ 
                      {validator: validateNumeric, messageError: t('price_error_format')}
                    ]}                                 
                    onChange = {({name, value, error})=>dispatch({type: UPDTATE_PRODUCT, value: {name, value, error}})}         
                  />
                </div> 

                {state.activeButtonNewProduct && <div className="spn-react-send-product__ok">{t('message_product_sent_successfully')}</div>}
                {!state.activeButtonNewProduct ? <button className="react-button" data-testid="buttonLogin" type="submit">{t('send_text_button')}</button>
                                                  : <a className="react-button"  onClick={newProduct}>{t('new_product_button_text')}</a>}
                <Link className="spn-link react-button" to="/listado">{t('products_list_text')}</Link>
                {state.sendProductError && <p className="react-campo-server-error">{t('server_error')}</p>}            

              </div>
            }>
          </Form>
          : <div>{t('loading_sending_product_text')}</div>
          }

      </div>
    </div>

    </div>
}
