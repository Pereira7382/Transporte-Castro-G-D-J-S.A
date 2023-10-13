package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import una.ac.cr.sistema_transporte.domain.MovimientoInventario;

public class DataMovimiento extends DataBase {

    public final static String TABLAMOVIMIENTOS = "movimiento_inventario";
    public final static String ID = "id";
    public final static String ID_PIEZA = "id_pieza";
    public final static String DESCRIPCION = "descripcion";
    public final static String TIPO = "tipo_movimiento";
    public final static String CANTIDAD = "cantidad";
    public final static String FECHA = "fecha_movimiento";

    public boolean registrarMovimiento(MovimientoInventario movimiento) {
        try {
            Connection cn = getConexion();
            String query = "INSERT INTO " + TABLAMOVIMIENTOS + " (" + ID_PIEZA + ", " + DESCRIPCION
                    + ", " + TIPO + ", " + CANTIDAD  + ", " + FECHA + ")"
                    + " VALUES (?, ?, ? , ?, ?)";
            PreparedStatement sentencia = (PreparedStatement) cn.prepareStatement(query);

            sentencia.setString(1, String.valueOf(movimiento.getId_pieza()));
            sentencia.setString(2, movimiento.getDescripcion());
            sentencia.setString(3, movimiento.getTipo_movimiento());
            sentencia.setString(4, String.valueOf(movimiento.getCantidad()));
            sentencia.setDate(5, new java.sql.Date(movimiento.getFecha_movimiento().getTime())); // Convierte Date a java.sql.Date            sentencia.execute();
            sentencia.execute();
            return true;
        } catch (Exception e) {
            System.out.println("\n  error encontrado : " + e.toString());
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
            while (result.next()) {
                MovimientoInventario movimiento = new MovimientoInventario();
                movimiento.setId(result.getInt(ID));
                movimiento.setCantidad(result.getInt(CANTIDAD));
                movimiento.setDescripcion(result.getString(DESCRIPCION));
                movimiento.setTipo_movimiento(result.getString(TIPO));
                movimiento.setId_pieza(id);
                movimiento.setFecha_movimiento(result.getDate(FECHA));
                movimientos.add(movimiento);
            }

        } catch (SQLException e) {
            System.out.println("\n error al traer: " + e.toString());
        }
        return movimientos;
    }

    public LinkedList<MovimientoInventario> movimientoPorFecha(Date fechaInicio, Date fechaFin){
        LinkedList<MovimientoInventario> movimientos = new LinkedList<>();
        Connection cn = getConexion();
        String query = "SELECT * FROM " + TABLAMOVIMIENTOS + " WHERE " + FECHA + " BETWEEN '"+ fechaInicio +"' AND '" + fechaFin +"'";
        try {
            PreparedStatement prepare = cn.prepareStatement(query);
            ResultSet result = prepare.executeQuery();
              while (result.next()) {
                MovimientoInventario movimiento = new MovimientoInventario();
                movimiento.setId(result.getInt(ID));
                movimiento.setCantidad(result.getInt(CANTIDAD));
                movimiento.setDescripcion(result.getString(DESCRIPCION));
                movimiento.setTipo_movimiento(result.getString(TIPO));
                movimiento.setId_pieza(result.getInt(ID_PIEZA));
                movimiento.setFecha_movimiento(result.getDate(FECHA));
                movimientos.add(movimiento);
            }
        } catch (SQLException e) {
            System.out.println("Ocurrio un error al conectarse con la base de datos");
        }
        return movimientos;
    }
    
}
