package una.ac.cr.sistema_transporte.controller;

import java.util.Calendar;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import una.ac.cr.sistema_transporte.Logica.LogicaGastoAceite;
import una.ac.cr.sistema_transporte.domain.RellenoAceite;

@Controller
@RequestMapping("/rellenoAceite")
//@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
@CrossOrigin(origins = "*")
public class RellenoAceiteController {

    LogicaGastoAceite logica = new LogicaGastoAceite();

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public boolean agregarRelleno(@RequestBody RellenoAceite relleno) {
       /*System.out.println("\n valores recibidos: " + relleno.getId_mantenimiento() + relleno.getObservaciones()+relleno.getCantidad());
        return true;*/
        java.util.Date utilDate = Calendar.getInstance().getTime();

        // Convertir java.util.Date a java.sql.Date
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

        // Establecer la fecha actual en el objeto GastoCombustible
        relleno.setFecha(sqlDate);

        return logica.agregarRelleno(relleno);
    }
}
