package una.ac.cr.sistema_transporte.Logica;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.LinkedList;
import org.springframework.beans.factory.annotation.Autowired;
import una.ac.cr.sistema_transporte.data.DataGastoLlanta;
import una.ac.cr.sistema_transporte.domain.GastoLlanta;
import una.ac.cr.sistema_transporte.service.camionService;

public class LogicaGastoLlanta {

    DataGastoLlanta data = new DataGastoLlanta();

    public boolean agregar(GastoLlanta gasto) {
        return data.agregar(gasto);
    }

    public LinkedList<GastoLlanta> obtenerGastoLlanta() {
        return data.obtenerGastoLlanta();
    }

    public boolean eliminarLlantas(int id) {
        return data.eliminarLlantas(id);
    }

    //Este método calcula el total de gastos para un camión específico. 
    //Recorre la lista de gastos obtenidos de la base de datos y suma los montos de aquellos 
    // que pertenecen al camión cuya matrícula coincide con la proporcionada como parámetro.
    public double calcularTotalGastosPorCamion(String matriculaCamion) {
        double total = 0;
        LinkedList<GastoLlanta> gastos = obtenerGastoLlanta();
        for (GastoLlanta gasto : gastos) {
            if (gasto.getMatriculaCamion().equals(matriculaCamion)) {
                total += gasto.getMonto();
            }
        }
        return total;
    }
    //Este método calcula el promedio de gastos por kilómetro recorrido
    //para un camión específico. Suma los montos y los kilómetros recorridos
    //de todos los gastos asociados al camión dado y luego realiza la división.

    public double calcularPromedioGastosPorKilometro(String matriculaCamion) {
        double totalGastos = 0;
        int totalKilometros = 0;
        LinkedList<GastoLlanta> gastos = obtenerGastoLlanta();
        for (GastoLlanta gasto : gastos) {
            if (gasto.getMatriculaCamion().equals(matriculaCamion)) {
                totalGastos += gasto.getMonto();
                totalKilometros += gasto.getKmCamion();
            }
        }

        if (totalKilometros == 0) {
            return 0.0;
        }

        BigDecimal promedio = BigDecimal.valueOf(totalGastos).divide(BigDecimal.valueOf(totalKilometros), 4, RoundingMode.HALF_UP);
        return promedio.doubleValue();
    }

    public int calcularDuracionPromedioLlantas(String matriculaCamion) {
        int duracionTotal = 0;
        int cantidadLlantas = 0;
        LinkedList<GastoLlanta> gastos = obtenerGastoLlanta();
        for (GastoLlanta gasto : gastos) {
            if (gasto.getMatriculaCamion().equals(matriculaCamion)) {
                duracionTotal += gasto.getDuracion();
                cantidadLlantas++;
            }
        }
        return cantidadLlantas > 0 ? duracionTotal / cantidadLlantas : 0;
    }

    public int vidaUtilRestanteLLantas(String MatriculaCamion) {

        int kilometrajeActual = data.obtenerKilometrajePorMatricula(MatriculaCamion);
        System.out.println("kilometraje actual: " + kilometrajeActual );
        int vidaLLantas = 0;
        int kilometrajeAlCambioActual = 0;
        LinkedList<GastoLlanta> gastos = obtenerGastoLlanta();
        for (GastoLlanta gasto : gastos) {
            if (gasto.getMatriculaCamion().equals(MatriculaCamion)) {
                vidaLLantas = gasto.getDuracion();
                System.out.println("vida de llantas:" + vidaLLantas);
                kilometrajeAlCambioActual = gasto.getKmCamion();
                System.out.println("kilemetraje al momento del cambio de llantas:"+kilometrajeAlCambioActual);
            }
        }

        int x = kilometrajeActual - kilometrajeAlCambioActual;
        
        if(kilometrajeAlCambioActual==0){
            return 0;
        }
        if(vidaLLantas==0){
        return 0;
        }else if(x==0){
        return vidaLLantas;
        }
        
        return  vidaLLantas - (kilometrajeActual - kilometrajeAlCambioActual);

    }

    public int contarLlantasReemplazadas(String matriculaCamion) {
        int cantidadReemplazadas = 0;
        LinkedList<GastoLlanta> gastos = obtenerGastoLlanta();
        for (GastoLlanta gasto : gastos) {
            if (gasto.getMatriculaCamion().equals(matriculaCamion)) {
                cantidadReemplazadas++;
            }
        }
        return cantidadReemplazadas;
    }


}
