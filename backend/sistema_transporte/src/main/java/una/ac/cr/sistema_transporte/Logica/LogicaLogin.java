/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.Logica;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.sql.Date;
import java.util.LinkedList;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.stereotype.Component;
import java.util.LinkedList;
import java.util.Random;
import una.ac.cr.sistema_transporte.data.DataLogin;
import una.ac.cr.sistema_transporte.domain.Usuario;
import una.ac.cr.sistema_transporte.security.Encriptacion;
import una.ac.cr.sistema_transporte.service.ServiceEmail;

@Component
public class LogicaLogin {

    Encriptacion encriptacion = new Encriptacion();
    DataLogin dataLogin = new DataLogin();
    

    public boolean validarAcceso(Usuario usuario) {
        //recuperar lista de usuarios registrados en la base de datos.
        LinkedList<Usuario> usuarios = new LinkedList<Usuario>();
        usuarios = dataLogin.obtenerUsuarios();
        //recorro la lista de usuarios y si el metodo de comparar password del usuario actual de la lista
        // con el usuario que se pasa por parametro retorna true quiere decir que hay un usuario con las credenciales

        for (Usuario us : usuarios) {
            //primero ver el usuario, si el usuario es igual al que se esta bsucando se compara contraseñas
            if (us.getUsuario().equals(usuario.getUsuario())) {
                //comparamos contraseñas, si las contrasñas coinciden entonces slaimos con true;
                if (encriptacion.compararPasswords(usuario.getClave(), us.getClave())) {
                    return true;
                }
            }
        }
        return false;
    }

    public int agregarUsuario(Usuario usuario) {
        System.out.println("\n llego a la logica a registrar nuevo usuario ");
        int estado=0;
        boolean agregado = false;
        
        boolean activo=false;
      
        //encriptar la contraseña
        String contraseniaEncriptada = "";
        contraseniaEncriptada = encriptacion.encriptarContrasena(usuario.getClave());
        usuario.setClave(contraseniaEncriptada);
        activo = dataLogin.verificarUsuarioActivo(usuario.getUsuario());
        
        
        if(activo == true){
            estado=1;
            System.out.println("Se encuentra en estado:"+ estado);
        return estado;
        }else if(activo==false){
            System.out.println("Se encuentra en estado:"+ estado);
        agregado = dataLogin.agregarUsuario(usuario);
        
        if(agregado==false){
            estado=2;
            System.out.println("Se encuentra en estado:"+ estado);
        return estado;
        }
        System.out.println("Se encuentra en estado:"+ estado);
        estado=3;
        return 3;
        //enviarsela a la capa de acceso a datos para que esta haga la comparacion.
        }
        
        return estado;

    }

    public String generarTokenUnico(String informacionUnica) {
        String claveSecreta = "a1b2C3d4E5f6G7h8I9j0KlMnOpQrStUvWxYzAqBpCrDsEtFuGvHwIxJyKzLmNoPjQkRlSmTnUoVpWqXrYsZtUvWxYzA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5ZaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
        byte[] claveBytes = claveSecreta.getBytes(StandardCharsets.UTF_8);
        Key jwtSecret = new SecretKeySpec(claveBytes, SignatureAlgorithm.HS256.getJcaName());
        Date expirationDate = new Date(System.currentTimeMillis() + 120000); // 2 minutos de duración para el token
        System.out.println("Clave Secreta para Firmar: " + jwtSecret);
        String jwt = Jwts.builder()
                .setSubject(informacionUnica)
                .setExpiration(expirationDate)
                .signWith(jwtSecret)
                .compact();

        return jwt;
    }
    
    public boolean validadCorreoExistente(String usuario){
    
        return dataLogin.buscarEmail(usuario);
    
    }
    
    public boolean validarContrasenia(String contrasenia) {
        // Expresión regular para validar la contraseña
        String passwordPattern = "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&/])[A-Za-z\\d@$!%*?&/]{8,}$";
        return contrasenia.matches(passwordPattern);
    }
    
    
    public boolean activarCuenta(String correo, String codigo) {
    String code = dataLogin.obtenerCodigoPorUsuario(correo);
    //System.out.println("Verifica codigo:" + code);

    // Verifica si el código obtenido es null
    if (code == null ? codigo != null : !code.equals(codigo)) {
        // Maneja el caso donde el código es null (por ejemplo, registrando un log)
        System.out.println("El código para el usuario " + correo + " es null.");
        return false;
    }

    // Convierte ambos códigos a minúsculas antes de compararlos
    code = code.toLowerCase();
    codigo = codigo.toLowerCase();

    // Verifica si los códigos son iguales (considerando minúsculas)
    if (code.equals(codigo)) {
        // Actualiza el activo
        dataLogin.actualizarActivo(correo, codigo);
        return true;
    }

    return false;
}
    
    
    public boolean verificarActivo(String usuario){
    
    return dataLogin.verificarActivoPorUsuario(usuario);
    }

    

}
