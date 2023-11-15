package una.ac.cr.sistema_transporte.controller;

import java.util.Calendar;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import una.ac.cr.sistema_transporte.Logica.LogicaGastoAceite;
import una.ac.cr.sistema_transporte.domain.RellenoAceite;

@Controller
@RequestMapping("/rellenoAceite")
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

        //obtener el km del camion al momento del relleno
        int km = logica.obtenerKilometrajeActualPorMantenimiento(relleno.getId_mantenimiento());
        if (km != -1) {
            relleno.setKm_momento(km);
        } else {
            System.out.println("\n error ");
        }
        return logica.agregarRelleno(relleno);
    }

    @GetMapping()
    @ResponseBody
    public List<RellenoAceite> listar() {
        System.out.println("\n llego a listar");
        System.out.println(" \n rellenos encontrados " + logica.listarRellenos());
        return logica.listarRellenos();
    }

    @PutMapping("/{id}")
    @ResponseBody
    public boolean actualizarRelleno(@PathVariable("id") int id, @RequestBody RellenoAceite relleno) {
        System.out.println("\n llego a actualizar rellenooooooooooooooooooooo");
        return logica.actualizarRelleno(id, relleno);
    }

}
