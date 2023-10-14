/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import una.ac.cr.sistema_transporte.Logica.LogicaLogin;
import una.ac.cr.sistema_transporte.Logica.LogicaLoginRep;

@Controller
@RequestMapping("/loginRep")
@CrossOrigin(origins = "*")
public class RecuperacionController {

    private final LogicaLoginRep logicaLogin;
    private final LogicaLogin log;

    @Autowired
    public RecuperacionController(LogicaLoginRep logicaLogin,LogicaLogin log) {
        this.logicaLogin = logicaLogin;
        this.log = log;
        
    }

    @PostMapping("/recuperar-contrasena")
public ResponseEntity<Map<String, String>> iniciarRecuperacionContrasena(@RequestBody Map<String, String> body) {
    String email = body.get("email").replaceAll("\"", ""); // Eliminar las comillas del valor del campo "email"
    boolean exitoso;
    Map<String, String> response = new HashMap<>();

    if (logicaLogin.validarEstadoToken(email)) {
        response.put("message", "El enlace de recuperación ya enviado con exito.");
        return ResponseEntity.ok(response);
    } else {
        exitoso = logicaLogin.iniciarRecuperacionContrasena(email, 1);
        
        if (exitoso) {
            response.put("message", "Solicitud de recuperación de contraseña enviada correctamente");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "El correo ingresado no exite.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}


@PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam("token") String token, @RequestBody Map<String, String> request) {
        String newPassword = request.get("newPassword");
        String correoElectronico = "";
        Map<String, Object> response = new HashMap<>();

        String claveSecreta = "a1b2C3d4E5f6G7h8I9j0KlMnOpQrStUvWxYzAqBpCrDsEtFuGvHwIxJyKzLmNoPjQkRlSmTnUoVpWqXrYsZtUvWxYzA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5ZaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";

        byte[] claveBytes = claveSecreta.getBytes(StandardCharsets.UTF_8);
        Key jwtSecret = new SecretKeySpec(claveBytes, SignatureAlgorithm.HS256.getJcaName());

        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(token)
                    .getBody();

            correoElectronico = claims.getSubject();
            Date expirationDate = claims.getExpiration();
            Date currentDate = new Date();

            if (expirationDate.before(currentDate)) {
                logicaLogin.actualizarEstadoToken(correoElectronico);
                response.put("type", "error");
                response.put("message", "El enlace ha expirado");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            } else {
                boolean exitoso = logicaLogin.actualizarContraseniaRecuperacion(token, newPassword);

                if (exitoso) {
                    response.put("type", "success");
                    response.put("message", "Contraseña cambiada exitosamente");
                    return ResponseEntity.ok(response);
                } else {
                    response.put("type", "error");
                    response.put("message", "Error al cambiar la contraseña");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
                }
            }
        } catch (ExpiredJwtException ex) {
            correoElectronico = ex.getClaims().getSubject();
            logicaLogin.actualizarEstadoToken(correoElectronico);
            response.put("type", "error");
            response.put("message", "El enlace ha expirado");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (Exception e) {
            response.put("type", "error");
            response.put("message", "Error al procesar el token");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
