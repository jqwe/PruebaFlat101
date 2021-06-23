/* Pruebas para el componete App
- Inicialmente se muestra el componente Login
- Se introduce un login en formato correcto y password pero no existe el usuario
- Se introduce un login correcto y password errónea
- Se introduce login y password correctas
*/

import React from 'react';
import { shallow, mount, Enzyme, configure, render }  from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import App from './App';

configure({ adapter: new Adapter() });

let componente;
beforeEach( () => {  
  componente = mount(<App />);
});

test('Inicialmente se muestra el componente Login', () => {       
      expect(componente.find(".login-connected")).toHaveLength(1);
      expect(componente.find(".wellcome-container")).toHaveLength(0);
});

test('Se introduce un login en formato correcto y password pero no existe el usuario', () => {
  let inputLogin = componente.find("#login");
      inputLogin.instance().value = 'ddd@aaa.aa';
      inputLogin.simulate('blur');
  let inputPasword = componente.find("#password");
      inputPasword.instance().value = 'fff';
      inputPasword.simulate('blur');
      componente.find("button.react-button-submit").simulate('click');
      setInterval(()=>{
        expect(componente.find('.react-campo-server-error')).toHaveLength(1);
        expect(componente.find(".wellcome-container")).toHaveLength(0);     
      }, 2000);
      
});

test('Se introduce un login correcto y password errónea', () => {
  let inputLogin = componente.find("#login");
      inputLogin.instance().value = 'aaa@aaa.aaa';
      inputLogin.simulate('blur');
  let inputPasword = componente.find("#password");
      inputPasword.instance().value = 'fff';
      inputPasword.simulate('blur');
      componente.find("button.react-button-submit").simulate('click');
      setInterval(()=>{
        expect(componente.find('.react-campo-server-error')).toHaveLength(1);
        expect(componente.find(".wellcome-container")).toHaveLength(0);     
      }, 2000);
        
});

test('Se introduce login y password correctas', () => {
  let inputLogin = componente.find("#login");
      inputLogin.instance().value = 'aaa@aaa.aaa';
      inputLogin.simulate('blur');
  let inputPasword = componente.find("#password");
      inputPasword.instance().value = 'aaa';
      inputPasword.simulate('blur');
      componente.find("button.react-button-submit").simulate('click');
      setInterval(()=>{
        expect(componente.find('.react-campo-server-error')).toHaveLength(0);
        expect(componente.find(".login-connected")).toHaveLength(0);
        expect(componente.find(".wellcome-container")).toHaveLength(1);    
      }, 2000);  
});
  
 

