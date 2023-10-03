package una.ac.cr.sistema_transporte.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import una.ac.cr.sistema_transporte.Logica.LogicaLogin;
import una.ac.cr.sistema_transporte.domain.Usuario;

@Controller
@RequestMapping("/login")
@CrossOrigin(origins = "*")
public class LoginController {
    
    LogicaLogin logicaLogin = new LogicaLogin();

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
    @ResponseBody
    public ResponseEntity<Boolean> validarAcceso(@RequestBody Usuario usuario) {
        
        //a continuacion enviamos a logica el usuario para que esta se conecte a los datos 
        //y valide el usuario.
        boolean acceso = logicaLogin.validarAcceso(usuario);
        if (acceso) {
            return ResponseEntity.ok(true); // Acceso permitido
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false); // Acceso no autorizado
        }
    }

}
