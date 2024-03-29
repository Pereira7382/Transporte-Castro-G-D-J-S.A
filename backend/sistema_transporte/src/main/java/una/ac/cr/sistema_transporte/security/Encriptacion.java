
package una.ac.cr.sistema_transporte.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Encriptacion {
    
    public String encriptarContrasena(String contrasena){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String contraseñaEncriptada = passwordEncoder.encode(contrasena);
        return contraseñaEncriptada;
    }
    
    public boolean compararPasswords(String contraseniaUsuario, String contraseniaAlmacenadaEncriptada){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(contraseniaUsuario, contraseniaAlmacenadaEncriptada);
    }
}
