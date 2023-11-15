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
import una.ac.cr.sistema_transporte.Logica.LogicaGastoAceite;
import una.ac.cr.sistema_transporte.domain.GastosAceite;

/**
 *
 * @author josep
 */

@Controller
@RequestMapping("/gastosAceite")
@CrossOrigin(origins = "*")
public class GastoAceitesController {
    
    LogicaGastoAceite logica = new LogicaGastoAceite();
    
    
    @GetMapping
    @ResponseBody
    public List<GastosAceite> listarGastosAceite() {
        return logica.obtenerGastoAceite();
    }
    
    
}
