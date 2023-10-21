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
import una.ac.cr.sistema_transporte.Logica.LogicaLoginRep;
import una.ac.cr.sistema_transporte.domain.Usuario;

@Controller
@RequestMapping("/login")
@CrossOrigin(origins = "*")
public class LoginController {
    
    LogicaLogin logicaLogin = new LogicaLogin();
    
/*
    @PostMapping(value = "/validar", consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
    @ResponseBody
    public ResponseEntity<Boolean> validarAcceso(@RequestBody Usuario usuario) {
        boolean acceso = logicaLogin.validarAcceso(usuario);
        boolean porActivar = logicaLogin.verificarActivo(usuario.getUsuario());
        
        
        
        if (acceso) {
            System.out.println("\n acceso autorizado ");
            return ResponseEntity.ok(true); // Acceso permitido
        } else {
            System.out.println("\n acceso denegado ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false); // Acceso no autorizado
        }
    }
    */
    @PostMapping(value = "/validar", consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
@ResponseBody
public ResponseEntity<Map<String, Object>> validarAcceso(@RequestBody Usuario usuario) {
    boolean acceso = logicaLogin.validarAcceso(usuario);
    boolean porActivar = logicaLogin.verificarActivo(usuario.getUsuario());

    Map<String, Object> response = new HashMap<>();

    if (porActivar) {
        System.out.println("\n cuenta no activa ");
        response.put("accesoAutorizado", false);
        response.put("mensaje", "Esta cuenta aun no se encuentra activa, verifique el correo.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    } else {
        if (acceso) {
            System.out.println("\n acceso autorizado ");
            response.put("accesoAutorizado", true);
            response.put("mensaje", "Acceso permitido");
            return ResponseEntity.ok(response);
        } else {
            System.out.println("\n acceso denegado ");
            response.put("accesoAutorizado", false);
            response.put("mensaje", "Acceso no autorizado");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}


    
    /*
 @PostMapping(value = "/agregar", consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
@ResponseStatus(HttpStatus.CREATED)
@ResponseBody
public ResponseEntity<Map<String, Object>> agregarUsuario(@RequestBody Usuario usuario) {
    // Validar la contraseña
    if (!logicaLogin.validarContrasenia(usuario.getClave())) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "La contraseña no cumple con los requisitos mínimos.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    int registroExitoso = logicaLogin.agregarUsuario(usuario);

    Map<String, Object> response = new HashMap<>();
    response.put("success", registroExitoso);

    if (registroExitoso == 1) {
        response.put("message", "Esta cuenta se encuentra a la espera de ser activada. Revise su correo para el mensaje de activación.");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } else if (registroExitoso == 3) {
        
        response.put("message", "Usuario registrado correctamente, se ha enviado un codigo de activacion a su cuenta.");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } else {
        response.put("message", "Error al registrar el usuario.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
*/

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
   
    @PostMapping(value = "/activar-cuenta", consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
    @ResponseBody
    public ResponseEntity<Map<String, Object>> activarCuenta(@RequestBody Map<String, String> requestBody) {
        String correo = requestBody.get("correo");
        String codigoActivacion = requestBody.get("codigo");
        System.out.println("entrooooo");

        if (correo == null || correo.isEmpty() || codigoActivacion == null || codigoActivacion.isEmpty()) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Correo o código de activación inválido.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        System.out.println("Este es el correo:" + correo + "Este el codigo:"+ codigoActivacion);
        boolean activacionExitosa = logicaLogin.activarCuenta(correo, codigoActivacion);
        System.out.println(activacionExitosa);
        Map<String, Object> response = new HashMap<>();

        if (activacionExitosa) {
            response.put("success", true);
            response.put("message", "¡Cuenta activada correctamente!");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Código de activación incorrecto.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

}
