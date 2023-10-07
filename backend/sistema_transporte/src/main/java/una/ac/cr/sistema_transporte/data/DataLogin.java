package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.logging.Level;
import java.util.logging.Logger;
import una.ac.cr.sistema_transporte.domain.Usuario;

public class DataLogin extends DataBase {

    public final static String TB_USUARIOS = "usuarios";
    public final static String ID_USUARIO = "id";
    public final static String USUARIO = "usuario";
    public final static String CONTRASENIA = "contrasenia";

    public LinkedList<Usuario> obtenerUsuarios() {
        boolean acceso = false;
        // Consulta SQL parametrizada
        String query = "SELECT * FROM " + TB_USUARIOS ;

        LinkedList<Usuario> listaUsuarios = new LinkedList<Usuario>();
        
        Connection con = getConexion();

        try {
            PreparedStatement prepared = con.prepareStatement(query);
            ResultSet result = prepared.executeQuery();
            Usuario usuario = null;
            while (result.next()) {

                usuario = new Usuario();
                usuario.setClave(result.getString(CONTRASENIA));
                usuario.setUsuario(result.getString(USUARIO));
                listaUsuarios.add(usuario);

            }

            prepared.close();
            return listaUsuarios;

        } catch (SQLException ex) {
            Logger.getLogger(DataCamion.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
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
