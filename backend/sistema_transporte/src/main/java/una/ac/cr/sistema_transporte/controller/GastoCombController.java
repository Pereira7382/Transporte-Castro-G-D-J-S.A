package una.ac.cr.sistema_transporte.controller;
import java.text.DecimalFormat;
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
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import una.ac.cr.sistema_transporte.domain.DatosConsumoComb;

@Controller
@RequestMapping("/gastoCombustible")
//@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
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
        //  return gasto;
        if (logica.agregar(gasto)) {
            return gasto;
        } else {
            return null;
        }

    }

    @GetMapping("/{matricula}")
    @ResponseBody
    public DatosConsumoComb obtenerGastosCPorId(@PathVariable String matricula) {

        //aqui lo que ocupo retornar no es los gastos en si, sino una estructura que 
        // tenga los datos de consumo del camion calculados es decir suma de kilometros recorridos
        // en el intervalo de tiempo, suma de litros de combustible consumidos en el intervalo de tiempo
        // promedio de litros de combustible por kilometro recorrido
        // total de gasto en combustible y promedio de gasto monetario por kilometro recorrido 
        //tengo la lista de gastos del camion
        List<GastoCombustible> listaGastos = logica.obtenerGastosCamion(matricula);

        //ahora por cada gasto tengo que ir calculando los datos
        int totalKm = 0;
        int totalLitros = 0;
        double totalMonto = 0;
        double ltXkm = 0;
        double montoXkm = 0;

        for (GastoCombustible gasto : listaGastos) {
            totalKm += gasto.getKilometrajeActual() - gasto.getKilometrajeAnterior();
            totalLitros += gasto.getLitros();
            totalMonto += gasto.getMonto();
        }

        // tengo los datos principales, comienzo a calcular los datos estadisticos
        ltXkm = totalLitros / totalKm;
        montoXkm = totalMonto / totalKm;

        // Formatear los valores double a 3 decimales
        DecimalFormat df = new DecimalFormat("#.###");

// Tener en cuenta que se debe usar el formato para cada campo que contenga un valor double
        ltXkm = Double.parseDouble(df.format(totalLitros / totalKm).replace(',', '.'));
        montoXkm = Double.parseDouble(df.format(totalMonto / totalKm).replace(',', '.'));

        DatosConsumoComb datos = new DatosConsumoComb(totalKm, totalLitros, ltXkm, totalMonto, montoXkm);

        datos.imprimirInfo();

        return datos;

    }
    
    @GetMapping
    @ResponseBody
    public List<GastoCombustible> listarGastosCombustible() {
        return logica.obtenerGastosCamionConProveedor();
    }
    
    @DeleteMapping("/{id}/{matricula}")
    @ResponseBody
    public boolean eliminarGastoCombustible(@PathVariable int id, @PathVariable String matricula) {
        return logica.eliminarGastosCombustible(id, matricula);
    }
    
    
}
