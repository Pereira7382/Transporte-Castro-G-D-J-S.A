/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.Logica;

import una.ac.cr.sistema_transporte.data.DataLogin;
import una.ac.cr.sistema_transporte.domain.Usuario;
import una.ac.cr.sistema_transporte.security.Encriptacion;

public class LogicaLogin {
    
    Encriptacion encriptacion = new Encriptacion();
    DataLogin dataLogin = new DataLogin();
    
    public boolean validarAcceso(Usuario usuario){
        boolean acceso = false;
        
        //aqui encriptar la contraseña que trae el usuario y enviarla al acceso a datos encriptada 
        // y que se haga la comparacion de datos.
        
        //encriptar la contraseña
        String contraseniaEncriptada = "";
        contraseniaEncriptada = encriptacion.encriptarContrasena(usuario.getClave());
        
        acceso = dataLogin.validarAcceso(contraseniaEncriptada, usuario.getUsuario());
        //enviarsela a la capa de acceso a datos para que esta haga la comparacion.
        
        
        return acceso;
        
    }
    
    public boolean agregarUsuario(Usuario usuario){
        boolean agregado = false;
        
        //aqui encriptar la contraseña que trae el usuario y enviarla al acceso a datos encriptada
        
        //encriptar la contraseña
        String contraseniaEncriptada = "";
        contraseniaEncriptada = encriptacion.encriptarContrasena(usuario.getClave());
        usuario.setClave(contraseniaEncriptada);
        agregado = dataLogin.agregarUsuario(usuario);
        //enviarsela a la capa de acceso a datos para que esta haga la comparacion.
        
        
        return agregado;
        
    }
    
}
