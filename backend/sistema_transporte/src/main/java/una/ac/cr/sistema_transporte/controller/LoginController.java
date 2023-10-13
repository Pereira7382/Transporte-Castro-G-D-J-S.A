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
    public boolean agregarUsuario(@RequestBody Usuario usuario) {
        
        return logicaLogin.agregarUsuario(usuario);
    }

    
    
    
    
}
