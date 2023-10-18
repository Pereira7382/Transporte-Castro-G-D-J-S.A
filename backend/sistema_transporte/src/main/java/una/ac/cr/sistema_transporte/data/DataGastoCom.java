
package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import una.ac.cr.sistema_transporte.domain.GastoCombustible;

public class DataGastoCom extends DataBase{
    
    public final static String TABLAGASTOSC = "gastos_combustible";
    public final static String ID = "id";
    public final static String FACTURA = "numero_factura";
    public final static String MONTO = "monto";
    public final static String MATRICULA = "matricula";
    public final static String PROVEEDOR = "proveedor";
    public final static String KILOMETRAJEANTERIOR = "kilometrajeAnterior";
    public final static String KILOMETRAJEACTUAL = "kilometrajeActual";
    public final static String FECHA = "fecha";
    public final static String LITROS = "litros";
    public final static String ESTADO = "estado";
    
    public boolean agregar(GastoCombustible gasto) {
        try {
            Connection cn = getConexion();
            String query = "INSERT INTO " + TABLAGASTOSC + " (" + FACTURA + ", " + MONTO + ", " + MATRICULA + ", " + PROVEEDOR + ", " +
                    KILOMETRAJEANTERIOR + ", " + KILOMETRAJEACTUAL + ", " + FECHA + ", " + LITROS + ", " + ESTADO + ") " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement sentencia = cn.prepareStatement(query);
            // Convierte Date a java.sql.Date
            Date fecha = new Date(gasto.getFecha().getTime());
            sentencia.setString(1, gasto.getNumero_factura());
            sentencia.setDouble(2, gasto.getMonto());
            sentencia.setString(3, gasto.getMatricula());
            sentencia.setInt(4, gasto.getProveedor());
            sentencia.setInt(5, gasto.getKilometrajeAnterior());
            sentencia.setInt(6, gasto.getKilometrajeActual());
            sentencia.setDate(7, fecha);
            sentencia.setDouble(8, gasto.getLitros());
            sentencia.setInt(9, gasto.getEstado());

            sentencia.execute();
            return true;
        } catch (Exception e) {
            System.out.println("\n  error encontrado : " + e.toString());
            return false;
        }
    }
    
    public boolean actualizarKilometraje(int idCamion, int kilometraje) {
        try {
            Connection cn = getConexion();
            String query = "UPDATE tb_camion SET kilometraje = ? WHERE id = ?";
            PreparedStatement sentencia = cn.prepareStatement(query);
            sentencia.setInt(1, kilometraje);
            sentencia.setInt(2, idCamion);
            sentencia.executeUpdate();
            return true;
        } catch (Exception e) {
            System.out.println("\n  error encontrado : " + e.toString());
            return false;
        }
    }
}
