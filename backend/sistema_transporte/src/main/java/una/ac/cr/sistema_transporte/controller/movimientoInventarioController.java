
package una.ac.cr.sistema_transporte.controller;

import java.sql.Date;
import java.util.LinkedList;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import una.ac.cr.sistema_transporte.Logica.LogicaMovimientos;
import una.ac.cr.sistema_transporte.domain.MovimientoInventario;

@Controller
@RequestMapping("/movimientoinventario")
@CrossOrigin(origins = "*")
public class movimientoInventarioController {
    
    private LogicaMovimientos logica = new LogicaMovimientos();
    
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public MovimientoInventario guardarMovimiento(@RequestBody MovimientoInventario movimiento) {
        logica.registrarMovimiento(movimiento);
        return movimiento;
    }
    
    @GetMapping()
    @ResponseBody
    public LinkedList<MovimientoInventario> movimientosPieza(@RequestParam int pieza) {
        LinkedList<MovimientoInventario> movimientosPieza = logica.obtenerMovimientosPieza(pieza);
        System.out.println("\n cantidad de movimientos encontrados: " + movimientosPieza.size());
        return movimientosPieza;
    }
    
    @PostMapping("/reporte-fecha/{fechaInicio}/{fechaFin}")
    @ResponseBody
    public LinkedList<MovimientoInventario> movimientosFecha(@PathVariable Date fechaInicio, @PathVariable Date fechaFin){
        return logica.obtenerMovimientosPorFecha(fechaInicio, fechaFin);
    }
}
