/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.Logica;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import una.ac.cr.sistema_transporte.data.DataLogin;
import una.ac.cr.sistema_transporte.domain.Usuario;
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
    
    private static final String CARACTERES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    public static String generarCodigoAleatorio(int longitud) {
        Random random = new Random();
        StringBuilder codigo = new StringBuilder();

        for (int i = 0; i < longitud; i++) {
            int indiceCaracter = random.nextInt(CARACTERES.length());
            char caracterAleatorio = CARACTERES.charAt(indiceCaracter);
            codigo.append(caracterAleatorio);
        }

        return codigo.toString();
    }
    
    public boolean activarCuenta(String email) {

            String key = generarCodigoAleatorio(8);
            System.out.println("key 1:" + key);

            dataLogin.actualizarEstadoCuenta(email, key);

            String linkDeAcceso = "http://localhost:3000/admin-validarAcceso?correo=" + email;
            String cuerpoCorreo = "¡Hola!\n\nRecibes este correo porque has solicitado activar tu cuenta.El codigo de activacion es"+ key +"Haz clic en el siguiente enlace para activar su cuenta:\n\n" + linkDeAcceso + "\n\nSi no solicitaste la activacion, puedes ignorar este correo. Tu cuenta seguirá segura.\n\nGracias,\n[Transportes Castro G D JS.A]";

            System.out.println(email + "      " + cuerpoCorreo);
            serviceEmail.enviarCorreo(email, "Activación de Cuenta", cuerpoCorreo);

            return true;
        
    }
    
    public boolean agregarUsuario(Usuario usuario) {
        System.out.println("\n llego a la logica a registrar nuevo usuario ");

        boolean agregado = false;
        //encriptar la contraseña
        String contraseniaEncriptada = "";
        contraseniaEncriptada = encriptacion.encriptarContrasena(usuario.getClave());
        usuario.setClave(contraseniaEncriptada);

        agregado = dataLogin.agregarUsuario(usuario);
        System.out.println(agregado);
        System.out.println(usuario.getUsuario());
        activarCuenta(usuario.getUsuario());
        
        //enviarsela a la capa de acceso a datos para que esta haga la comparacion.

        return agregado;

    }

}
