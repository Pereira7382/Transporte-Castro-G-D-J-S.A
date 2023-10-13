import React, { useContext } from 'react';
import { AuthContext } from '../App';
import AccesoDenegado from '../Pages/AccesoDenegado';

const Seguridad = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return element;
  } else {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      return element;
    } else {
       return <AccesoDenegado></AccesoDenegado>;
    }
  }
};

export default Seguridad;
