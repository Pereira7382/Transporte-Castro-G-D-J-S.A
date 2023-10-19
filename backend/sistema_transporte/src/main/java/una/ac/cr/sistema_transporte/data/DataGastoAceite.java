package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import una.ac.cr.sistema_transporte.domain.GastoAceite;

public class DataGastoAceite extends DataBase {
    public final static String TABLAGASTOSACEITE = "gasto_aceite";
    public final static String ID = "id";
    public final static String FACTURA = "numero_factura";
    public final static String MONTO = "monto";
    public final static String FECHA = "fecha";
    public final static String ID_CAMION = "id_camion";
    public final static String ID_ACEITE = "id_aceite";
    public final static String ESTADO = "estado";

    public boolean agregar(GastoAceite gasto) {
        try {
            Connection cn = getConexion();
            String query = "INSERT INTO " + TABLAGASTOSACEITE + " (" + FACTURA + ", " + MONTO + ", " + FECHA + ", " + ID_CAMION + ", " + ID_ACEITE + ", " + ESTADO + ") VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement preparedStatement = cn.prepareStatement(query);
            preparedStatement.setString(1, gasto.getNumero_factura());
            preparedStatement.setDouble(2, gasto.getMonto());
            preparedStatement.setDate(3, new java.sql.Date(gasto.getFecha().getTime()));
            preparedStatement.setInt(4, gasto.getId_camion());
            preparedStatement.setInt(5, gasto.getId_aceite());
            preparedStatement.setString(6,String.valueOf( gasto.getEstado()));
            preparedStatement.executeUpdate();
            return true;
        } catch (SQLException e) {
            System.out.println("\n  error encontrado : " + e.toString());
            return false;
        }
    }
    
}
