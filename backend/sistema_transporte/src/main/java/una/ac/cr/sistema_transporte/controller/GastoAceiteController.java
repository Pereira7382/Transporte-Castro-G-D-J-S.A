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
import una.ac.cr.sistema_transporte.Logica.LogicaCalculos;
import una.ac.cr.sistema_transporte.Logica.LogicaGastoAceite;
import una.ac.cr.sistema_transporte.domain.DatosMantAceite;
import una.ac.cr.sistema_transporte.domain.GastoAceite;
import una.ac.cr.sistema_transporte.domain.GastosAceite;

@Controller
@RequestMapping("/gastoAceite")
@CrossOrigin(origins = "*")
public class GastoAceiteController {

    LogicaGastoAceite logica = new LogicaGastoAceite();
    LogicaCalculos logicaC = new LogicaCalculos();

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

        return logica.obtenerGastoAceite();
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public boolean eliminarGastoAceite(@PathVariable int id) {
        return logica.eliminarGastosAceite(id);
    }

    @GetMapping("/{matricula}")
    @ResponseBody
    public DatosMantAceite obtenerGastosCPorId(@PathVariable String matricula) {

        //aqui necesito ir a traer los datos del ultimo mantenimiento de aceite registrado
        //y apartir de ahi realizar los calculos estadisticos
        //importantisimo la lista de rellenos de ese mantenimiento!!!
        GastoAceite ultimoGasto = logica.ultimoMantenimiento(matricula);

        //tengo todos los datos necesarios, incluido los datos de relleno de aceite realizados
        //System.out.println(ultimoGasto.toString());
        //creo los datos qe voy a regresar al cliente
        DatosMantAceite datos = new DatosMantAceite();

        //obtenemos la fecha de ultimo mantenimiento
        datos.setFecha(ultimoGasto.getFecha());

        //se envian los litros originales del gasto al principio que seria la capacidad del camion
        datos.setLitros(ultimoGasto.getCamion().getCapacidad_aceite());

        // los litros consumidos seran, el total de litros que se le echo al creal el mantenimiento
        // mas todos los litros de los rellenos que se han hecho en el transcurso de ese mantenimiento
        datos.setLtConsumidos(logicaC.litrosConsumidos(ultimoGasto));

        //gasto total del mantenimiento tomando encuenta todos los rellenos realizados
        datos.setGastoTotal(logicaC.gastoTotal(ultimoGasto));
        
        //gasto por kilometro recorrido
        datos.setCostoXkm(logicaC.costoPorKm(ultimoGasto));
        
        //litros de aceites consumidos por km recorrido
        datos.setConsXkm(logicaC.ltXkm(ultimoGasto));
        
        // kilometros recorridos 
        datos.setKmRecorridos(logicaC.kmRecorridos(ultimoGasto));
        
        // kilometros restantes 
        datos.setKmRestantes(logicaC.kmRestantes(ultimoGasto));
        
        datos.setCaducidad(ultimoGasto.getAceite().getDuracion());
        
        System.out.println(" datos calculados: " + datos.toString());
        return datos;

    }

}
