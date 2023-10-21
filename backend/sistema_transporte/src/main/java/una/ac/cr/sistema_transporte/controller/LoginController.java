package una.ac.cr.sistema_transporte.controller;


import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import una.ac.cr.sistema_transporte.Logica.LogicaLogin;
import una.ac.cr.sistema_transporte.domain.Usuario;

@Controller
@RequestMapping("/login")
@CrossOrigin(origins = "*")
public class LoginController {
    
    LogicaLogin logicaLogin = new LogicaLogin();
    

    @PostMapping(value = "/validar", consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
    @ResponseBody
    public ResponseEntity<Boolean> validarAcceso(@RequestBody Usuario usuario) {
        boolean acceso = logicaLogin.validarAcceso(usuario);
        if (acceso) {
            System.out.println("\n acceso autorizado ");
            return ResponseEntity.ok(true); // Acceso permitido
        } else {
            System.out.println("\n acceso denegado ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false); // Acceso no autorizado
        }
    }
    
 @PostMapping(value = "/agregar", consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> agregarUsuario(@RequestBody Usuario usuario) {
        System.out.println("\n llego a la controller a registrar nuevo usuario ");
        
        // Validar la contraseña
        if (!logicaLogin.validarContrasenia(usuario.getClave())) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "La contraseña no cumple con los requisitos mínimos.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        boolean registroExitoso = logicaLogin.agregarUsuario(usuario);
        Map<String, Object> response = new HashMap<>();
        response.put("success", registroExitoso);
        if (registroExitoso) {
            response.put("message", "Usuario registrado correctamente.");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            response.put("message", "Error al registrar el usuario.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


   @GetMapping("/validarCorreo")
    @ResponseBody
    public ResponseEntity<String> validarCorreoExistente(@RequestParam String usuario) {
        boolean correoExistente = logicaLogin.validadCorreoExistente(usuario);
        System.out.println("entrooo");
        String mensaje;
        if (correoExistente) {
            mensaje = "El correo electrónico ya está registrado en nuestro sistema.";
        } else {
            mensaje = "El correo electrónico está disponible para registrarse.";
        }
        return ResponseEntity.ok(mensaje);
    }

}
