
package una.ac.cr.sistema_transporte.Logica;

import java.sql.Date;
import java.util.List;
import una.ac.cr.sistema_transporte.data.DataCamion;
import una.ac.cr.sistema_transporte.data.DataGastoCom;
import una.ac.cr.sistema_transporte.domain.GastoCombustible;

public class LogicaGastoComb {
    DataGastoCom data = new DataGastoCom();
    public boolean agregar(GastoCombustible gasto){
        if(data.agregar(gasto)){
            return data.actualizarKilometraje(gasto.getId_camion(), gasto.getKilometrajeActual());
        }
        return false;
    }
    
    public List<GastoCombustible> obtenerGastosCamion(String id){
        return data.obtenerGastosCamion(id);
    }
    
    public List<GastoCombustible> obtenerGastosCamionPorIntervalo(String id, Date fechaInicio, Date fechaFin){
        return data.obtenerGastosCamionEnIntervalo(id, fechaInicio, fechaFin);
    }
    
    public List<GastoCombustible>obtenerGastosCamionConProveedor(){
    return data.obtenerGastosConProveedor();
    }
    
    public boolean eliminarGastosCombustible(int id, String matricula){
        DataCamion dataCamion = new DataCamion();
        boolean flag = false;
        System.out.println(matricula);
        flag = data.eliminarGastoCombustible(id);
        GastoCombustible gasto = data.obtenerUltimoGastoPorMatricula(matricula);
        
        boolean actualizacionCamion = dataCamion.actualizarKilometrajeYMatricula(matricula, gasto.getKilometrajeActual());
        
        if(actualizacionCamion==false){
        flag = false;
        }
 
        return flag;
    
    }
    
    public void prueba(){
        
          GastoCombustible gasto = data.obtenerUltimoGastoPorMatricula("AAA002");
          
          System.out.println(gasto.getKilometrajeActual());
        /*
            List<GastoCombustible> gastos = obtenerGastosCamionConProveedor();
        
             for (GastoCombustible gasto : gastos) {
            System.out.println("Número de Factura: " + gasto.getNumero_factura());
            System.out.println("Monto: " + gasto.getMonto());
            System.out.println("Matrícula: " + gasto.getMatricula());
            System.out.println("Kilometraje Anterior: " + gasto.getKilometrajeAnterior());
            System.out.println("Kilometraje Actual: " + gasto.getKilometrajeActual());
            System.out.println("Fecha: " + gasto.getFecha());
            System.out.println("Litros: " + gasto.getLitros());
            System.out.println("Nombre Proveedor: " + gasto.getNombre());
            System.out.println("--------------------------");
        }
             */
      
             

    }
    
    public static void main(String[] args) {
        
        LogicaGastoComb log = new LogicaGastoComb();
        
        log.prueba();
        
    // Código a ejecutar cuando se inicie el programa
}

}
