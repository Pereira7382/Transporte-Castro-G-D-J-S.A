
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
}
