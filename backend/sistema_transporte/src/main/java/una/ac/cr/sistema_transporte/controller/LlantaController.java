/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.controller;

import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import una.ac.cr.sistema_transporte.Logica.LogicaLlanta;
import una.ac.cr.sistema_transporte.domain.Llanta;

@Controller
@RequestMapping("/llanta")
@CrossOrigin(origins = "*")
public class LlantaController {
    
    LogicaLlanta logica = new LogicaLlanta();
    
    @GetMapping
    @ResponseBody
    public List<Llanta> listar() {
        System.out.println("\n aceites registrados: " + logica.listar().toString());
        return logica.listar();
    }
}
