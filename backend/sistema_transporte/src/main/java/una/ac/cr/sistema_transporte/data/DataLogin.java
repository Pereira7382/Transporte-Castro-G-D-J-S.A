package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import una.ac.cr.sistema_transporte.domain.Usuario;

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

    public boolean agregarUsuario(Usuario usuario){
        boolean agregado = false;
        // Consulta SQL parametrizada para insertar un nuevo usuario
        String query = "INSERT INTO " + TB_USUARIOS + " (" + USUARIO + ", " + CONTRASENIA + ") VALUES (?, ?)";

        try (Connection con = getConexion(); PreparedStatement prepare = con.prepareStatement(query)) {
            // Establece los parámetros de la consulta con los valores del nuevo usuario
            prepare.setString(1, usuario.getUsuario());
            prepare.setString(2, usuario.getClave());

            // Ejecuta la consulta de inserción
            int filasAfectadas = prepare.executeUpdate();

            // Si se insertó al menos una fila, se considera que el usuario fue agregado con éxito
            if (filasAfectadas > 0) {
                agregado = true;
            }
        } catch (SQLException ex) {
            // Manejo de excepciones
            ex.printStackTrace();
        }

        return agregado;
    }

}
