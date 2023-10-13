/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.Logica;

import java.security.SecureRandom;
import java.util.Base64;
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

    public boolean iniciarRecuperacionContrasena(String email, int estado) {

        if (dataLogin.buscarEmail(email)) {

            String token = log.generarTokenUnico(email);
            System.out.println("token 1:" + token);

            dataLogin.asociarTokenRecuperacion(email, token, estado);

            String linkRecuperacion = "http://localhost:3000/admin-CambioContrasenia?token=" + token;
            String cuerpoCorreo = "¡Hola!\n\nRecibes este correo porque has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para crear una nueva contraseña segura y acceder a tu cuenta:\n\n" + linkRecuperacion + "\n\nSi no solicitaste este cambio, puedes ignorar este correo. Tu cuenta seguirá segura.\n\nGracias,\n[Transportes Castro G D JS.A]";

            System.out.println(email + "      " + cuerpoCorreo);
            serviceEmail.enviarCorreo(email, "Recuperación de Contraseña", cuerpoCorreo);

            return true;
        } else {
            return false;
        }
    }

    public boolean actualizarContraseniaRecuperacion(String token, String nuevaContrasenia) {

        Encriptacion encriptacion = new Encriptacion();
        DataLogin datalogin = new DataLogin();

        String nuevaPasswordIncriptada = encriptacion.encriptarContrasena(nuevaContrasenia);

        boolean check = datalogin.verificarYActualizarContraseniaConToken(token, nuevaPasswordIncriptada);

        return check;

    }

    public String generateSecretKey() {
        SecureRandom random = new SecureRandom();
        byte[] secretBytes = new byte[64];
        random.nextBytes(secretBytes);
        return Base64.getEncoder().encodeToString(secretBytes);
    }

    public boolean validarEstadoToken(String email) {

        return dataLogin.validarEstadoToken(email);

    }

    public boolean actualizarEstadoToken(String correo) {

        return dataLogin.actualizarEstadoToken(correo);

    }

}
