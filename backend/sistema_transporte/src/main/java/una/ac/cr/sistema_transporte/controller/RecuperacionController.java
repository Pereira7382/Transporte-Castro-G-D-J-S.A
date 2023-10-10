/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import una.ac.cr.sistema_transporte.Logica.LogicaLoginRep;

@Controller
@RequestMapping("/loginRep")
@CrossOrigin(origins = "*")
public class RecuperacionController {
    
    private final LogicaLoginRep logicaLogin;

    @Autowired
    public RecuperacionController(LogicaLoginRep logicaLogin) {
        this.logicaLogin = logicaLogin;
    }

    @PostMapping("/recuperar-contrasena")
    public ResponseEntity<String> iniciarRecuperacionContrasena(@RequestBody Map<String, String> body) {
        String email = body.get("email").replaceAll("\"", ""); // Eliminar las comillas del valor del campo "email"
        System.out.println(email);
        boolean exitoso = logicaLogin.iniciarRecuperacionContrasena(email);
        if (exitoso) {
            return ResponseEntity.ok("Solicitud de recuperación de contraseña enviada correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al enviar la solicitud de recuperación de contraseña");
        }
    }
    
}
