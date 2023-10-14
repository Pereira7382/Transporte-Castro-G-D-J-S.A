package una.ac.cr.sistema_transporte.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import una.ac.cr.sistema_transporte.Logica.LogicaGastoComb;
import una.ac.cr.sistema_transporte.domain.GastoCombustible;

import java.util.Calendar;

@Controller
@RequestMapping("/gastoCombustible")
@CrossOrigin(origins = "*")
public class GastoCombController {

    LogicaGastoComb logica = new LogicaGastoComb();

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public GastoCombustible agregar(@RequestBody GastoCombustible gasto) {
        gasto.setEstado(1);

        // Obtener la fecha y hora actual
        java.util.Date utilDate = Calendar.getInstance().getTime();

        // Convertir java.util.Date a java.sql.Date
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

        // Establecer la fecha actual en el objeto GastoCombustible
        gasto.setFecha(sqlDate);
       // System.out.println(gasto.imprimir());
       // return gasto;
        if (logica.agregar(gasto)) {
            return gasto;
        } else {
            return null;
        }
        
    }
}
