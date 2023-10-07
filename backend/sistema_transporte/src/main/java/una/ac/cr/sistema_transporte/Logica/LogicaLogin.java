/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.Logica;

import java.util.LinkedList;
import una.ac.cr.sistema_transporte.data.DataLogin;
import una.ac.cr.sistema_transporte.domain.Usuario;
import una.ac.cr.sistema_transporte.security.Encriptacion;

public class LogicaLogin {
    
    Encriptacion encriptacion = new Encriptacion();
    DataLogin dataLogin = new DataLogin();
    
    public boolean validarAcceso(Usuario usuario){
        //recuperar lista de usuarios registrados en la base de datos.
        LinkedList<Usuario> usuarios = new LinkedList<Usuario>();
        usuarios = dataLogin.obtenerUsuarios();
        //recorro la lista de usuarios y si el metodo de comparar password del usuario actual de la lista
        // con el usuario que se pasa por parametro retorna true quiere decir que hay un usuario con las credenciales
        
        for(Usuario us : usuarios){
            //primero ver el usuario, si el usuario es igual al que se esta bsucando se compara contraseñas
            if(us.getUsuario().equals(usuario.getUsuario())){
                //comparamos contraseñas, si las contrasñas coinciden entonces slaimos con true;
                if(encriptacion.compararPasswords( usuario.getClave(), us.getClave())){
                    return true;
                }
            }
        }
        return false;
    }
    
    public boolean agregarUsuario(Usuario usuario){
        boolean agregado = false;
        //encriptar la contraseña
        String contraseniaEncriptada = "";
        contraseniaEncriptada = encriptacion.encriptarContrasena(usuario.getClave());
        usuario.setClave(contraseniaEncriptada);
        agregado = dataLogin.agregarUsuario(usuario);
        //enviarsela a la capa de acceso a datos para que esta haga la comparacion.
        
        
        return agregado;
        
    }
    
}
