package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedList;
import una.ac.cr.sistema_transporte.domain.MovimientoInventario;

public class DataMovimiento extends DataBase {

    public final static String TABLAMOVIMIENTOS = "movimiento_inventario";
    public final static String ID = "id";
    public final static String ID_PIEZA = "id_pieza";
    public final static String DESCRIPCION = "descripcion";
    public final static String TIPO = "tipo_movimiento";
    public final static String CANTIDAD = "cantidad";

    public boolean registrarMovimiento(MovimientoInventario movimiento) {
        try {
            Connection cn = getConexion();
            String query = "INSERT INTO " + TABLAMOVIMIENTOS + " (" + ID_PIEZA + ", " + DESCRIPCION
                    + ", " + TIPO + ", " + CANTIDAD + ")"
                    + " VALUES (?, ?, ? , ?)";
            PreparedStatement sentencia = (PreparedStatement) cn.prepareStatement(query);

            sentencia.setString(1, String.valueOf(movimiento.getId_pieza()));
            sentencia.setString(2, movimiento.getDescripcion());
            sentencia.setString(3, movimiento.getTipo_movimiento());
            sentencia.setString(4, String.valueOf(movimiento.getCantidad()));
            sentencia.execute();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public LinkedList<MovimientoInventario> movimientosPieza(int id) {
        LinkedList<MovimientoInventario> movimientos = new LinkedList<>();
        Connection con = getConexion();
        String query = "SELECT * FROM " + TABLAMOVIMIENTOS + " WHERE " + ID_PIEZA + " = " + id;
        
        try {
            PreparedStatement prepare = con.prepareStatement(query);
            ResultSet result = prepare.executeQuery();
            while(result.next()){
                MovimientoInventario movimiento = new MovimientoInventario();
                movimiento.setId(result.getInt(ID));
                movimiento.setCantidad(result.getInt(CANTIDAD));
                movimiento.setDescripcion(result.getString(DESCRIPCION));
                movimiento.setTipo_movimiento(result.getString(TIPO));
                movimiento.setId_pieza(id);
                movimientos.add(movimiento);
            }
            
        } catch (Exception e) {
        }
        return movimientos;
    }

}
