package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class DataLogin extends DataBase {

    public final static String TB_USUARIOS = "usuarios";
    public final static String ID_USUARIO = "id";
    public final static String USUARIO = "usuario";
    public final static String CONTRASENIA = "contrasenia";

    public boolean validarAcceso(String usuario, String contrasenia) {
        boolean acceso = false;
        // Consulta SQL parametrizada
        String query = "SELECT * FROM " + TB_USUARIOS + " WHERE " + USUARIO + " = ? AND " + CONTRASENIA + " = ?";

        try (Connection con = getConexion(); PreparedStatement prepare = con.prepareStatement(query)) {

            // Establecer los parámetros de la consulta
            prepare.setString(1, usuario);
            prepare.setString(2, contrasenia);

            try (ResultSet result = prepare.executeQuery()) {
                if (result.next()) {
                    acceso = true;
                }
            }
        } catch (SQLException ex) {
        }

        return acceso;
    }

}
