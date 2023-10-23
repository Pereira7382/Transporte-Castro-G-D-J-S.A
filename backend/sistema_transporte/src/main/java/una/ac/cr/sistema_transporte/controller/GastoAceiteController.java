package una.ac.cr.sistema_transporte.controller;

import java.util.Calendar;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import una.ac.cr.sistema_transporte.Logica.LogicaGastoAceite;
import una.ac.cr.sistema_transporte.domain.Aceite;
import una.ac.cr.sistema_transporte.domain.GastoAceite;
import una.ac.cr.sistema_transporte.domain.GastosAceite;

@Controller
@RequestMapping("/gastoAceite")
@CrossOrigin(origins = "*")
public class GastoAceiteController {

    LogicaGastoAceite logica = new LogicaGastoAceite();
  

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public GastoAceite agregar(@RequestBody GastoAceite gasto) {
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
    public List<GastosAceite> listarGastosAceite() {
        System.out.println("LLEGÓ");
          
        return logica.obtenerGastoAceite();
    }

    
    
}
