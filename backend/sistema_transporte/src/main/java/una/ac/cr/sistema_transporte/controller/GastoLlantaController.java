/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.controller;

import java.util.Calendar;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import una.ac.cr.sistema_transporte.Logica.LogicaGastoLlanta;
import una.ac.cr.sistema_transporte.domain.GastoLlanta;


@Controller
@RequestMapping("/gastoLlanta")
@CrossOrigin(origins = "*")
public class GastoLlantaController {
    
    LogicaGastoLlanta logica = new LogicaGastoLlanta();

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public GastoLlanta agregar(@RequestBody GastoLlanta gasto) {
        /*System.out.println(" datos recibidos: "+ gasto.toString());
        return gasto;*/
        gasto.setEstado(1);

        // Obtener la fecha y hora actual
        java.util.Date utilDate = Calendar.getInstance().getTime();

        // Convertir java.util.Date a java.sql.Date
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

        // Establecer la fecha actual en el objeto GastoCombustible
        gasto.setFecha(sqlDate);
       // System.out.println(gasto.imprimir());
      //  return gasto;
        if (logica.agregar(gasto)) {
            return gasto;
        } else {
            return null;
        } 
    }
    
    @GetMapping
    @ResponseBody
    public List<GastoLlanta> obtenerGastos() {
        return logica.obtenerGastoLlanta();
    }
    
    @DeleteMapping("/{id}")
    @ResponseBody
    public boolean eliminarLlantas(@PathVariable int id) {
        return logica.eliminarLlantas(id);
    }
    
}
