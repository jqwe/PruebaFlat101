import React from 'react';
import {useTranslation} from 'react-i18next';

/**
Componente a mostrar cuando no existe una ruta
 * 
 * 
**/

export default function PageNotFound() {
  const { t } = useTranslation();
  
  return <div>    
      {t('page_not_found')}
    </div>
}