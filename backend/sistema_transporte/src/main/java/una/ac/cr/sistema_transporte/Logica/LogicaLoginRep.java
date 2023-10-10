/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.Logica;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import una.ac.cr.sistema_transporte.data.DataLogin;
import una.ac.cr.sistema_transporte.security.Encriptacion;
import una.ac.cr.sistema_transporte.service.ServiceEmail;

@Component
public class LogicaLoginRep {

    private final ServiceEmail serviceEmail;
    Encriptacion encriptacion = new Encriptacion();
    DataLogin dataLogin = new DataLogin();
    LogicaLogin log = new LogicaLogin();

    @Autowired
    public LogicaLoginRep(ServiceEmail serviceEmail) {
        this.serviceEmail = serviceEmail;
    }
    
    
    
    public boolean iniciarRecuperacionContrasena(String email) {
        
    if (dataLogin.buscarEmail(email)) {
        // Generar un token único
        System.out.println("entrooooooo2");
        String informacionUnica = "informacion-unica-para-generar-token";
        String token = log.generarTokenUnico(informacionUnica);
       
        
        // Asociar el token con el correo electrónico en la base de datos
        dataLogin.asociarTokenRecuperacion(email, token);

        // Enviar correo electrónico con el enlace de recuperación
        String linkRecuperacion = "http://localhost:3000/admin-CambioContrasenia?token=" + token;
        String cuerpoCorreo = "Haz clic en el siguiente enlace para recuperar tu contraseña: " + linkRecuperacion;
        System.out.println(email+ "      " + cuerpoCorreo);
        serviceEmail.enviarCorreo(email, "josepablopereira2002@gmail.com", "Recuperación de Contraseña", cuerpoCorreo);

        return true;
    } else {
        return false;
    }
}

    
}