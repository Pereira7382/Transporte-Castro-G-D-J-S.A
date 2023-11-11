/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.controller;

import java.sql.Date;
import java.text.DecimalFormat;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import una.ac.cr.sistema_transporte.Logica.LogicaGastoComb;
import una.ac.cr.sistema_transporte.domain.DatosConsumoComb;
import una.ac.cr.sistema_transporte.domain.GastoCombustible;

/**
 *
 * @author josep
 */

@Controller
@RequestMapping("/filtro")
@CrossOrigin(origins = "*")

public class FiltroController {
 
     LogicaGastoComb logica = new LogicaGastoComb();
     
     
    @GetMapping("/{matricula}")
    @ResponseBody
    public ResponseEntity<Object> obtenerGastosCPorIdIntervalo(@PathVariable String matricula,
            @RequestParam(name = "fechaInicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) String fechaInicioStr,
            @RequestParam(name = "fechaFin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) String fechaFinStr) {

        try {
            Date fechaInicio = Date.valueOf(fechaInicioStr);
            Date fechaFin = Date.valueOf(fechaFinStr);

            // Obtener la lista de gastos del camión
            List<GastoCombustible> listaGastos = logica.obtenerGastosCamionPorIntervalo(matricula, fechaInicio, fechaFin);

            // Calcular los datos estadísticos
            int totalKm = 0;
            int totalLitros = 0;
            double totalMonto = 0;

            for (GastoCombustible gasto : listaGastos) {
                totalKm += gasto.getKilometrajeActual() - gasto.getKilometrajeAnterior();
                totalLitros += gasto.getLitros();
                totalMonto += gasto.getMonto();
            }

            // Calcular los datos principales
            double ltXkm = (totalKm == 0) ? 0 : (double) totalLitros / totalKm;
            double montoXkm = (totalKm == 0) ? 0 : totalMonto / totalKm;

            // Formatear los valores double a 3 decimales
            DecimalFormat df = new DecimalFormat("#.###");

            ltXkm = Double.parseDouble(df.format(ltXkm).replace(',', '.'));
            montoXkm = Double.parseDouble(df.format(montoXkm).replace(',', '.'));

            // Crear y retornar la respuesta
            DatosConsumoComb datos = new DatosConsumoComb(totalKm, totalLitros, ltXkm, totalMonto, montoXkm);
            datos.imprimirInfo();

            return ResponseEntity.ok(datos);

        } catch (IllegalArgumentException e) {
            // Manejar la excepción si la conversión falla (por formato de fecha incorrecto, etc.)
            String mensajeError = "Formato de fecha incorrecto. Asegúrate de usar el formato yyyy-MM-dd.";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensajeError);
        } catch (Exception e) {
            // Manejar otras excepciones
            String mensajeError = "Error al procesar la solicitud. Detalles: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensajeError);
        }
    }

}
