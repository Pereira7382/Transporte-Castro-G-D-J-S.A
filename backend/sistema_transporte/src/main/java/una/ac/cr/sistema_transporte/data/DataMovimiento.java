
package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import una.ac.cr.sistema_transporte.domain.MovimientoInventario;

public class DataMovimiento extends DataBase{
    
    public final static String TABLAMOVIMIENTOS = "movimiento_inventario";
    public final static String ID = "id";
    public final static String ID_PIEZA = "id_pieza";
    public final static String DESCRIPCION = "descripcion";
    public final static String TIPO = "tipo_movimiento";
    public final static String CANTIDAD = "cantidad";
    
    
     public boolean registrarMovimiento(MovimientoInventario movimiento) {
        try {
            Connection cn = getConexion();
            String query = "INSERT INTO " + TABLAMOVIMIENTOS + " (" + ID_PIEZA + ", " + DESCRIPCION +
                    ", "+ TIPO + ", "+ CANTIDAD + ")"
                    + " VALUES (?, ?, ? , ?)";
            PreparedStatement sentencia = (PreparedStatement) cn.prepareStatement(query);
            
            sentencia.setString(1,  String.valueOf(movimiento.getId_pieza()));
            sentencia.setString(2, movimiento.getDescripcion());
            sentencia.setString(3, movimiento.getTipo_movimiento());
            sentencia.setString(4, String.valueOf(movimiento.getCantidad()));
            sentencia.execute();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
}
