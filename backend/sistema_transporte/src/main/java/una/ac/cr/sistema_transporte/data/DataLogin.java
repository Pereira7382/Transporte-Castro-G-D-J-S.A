package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.DriverManager;
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
        String query = "SELECT * FROM " + TB_USUARIOS;

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
            Logger.getLogger(DataLogin.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }
    

    /*public boolean agregarUsuario(Usuario usuario) throws SQLException {
        String query = "INSERT INTO " + TB_USUARIOS + " (" + USUARIO + ", " + CONTRASENIA + ") VALUES (?, ?)";

        Connection con = getConexion(); PreparedStatement prepare = con.prepareStatement(query);
        try {

            // Desactivar el modo de autocommit
            con.setAutoCommit(false);

            prepare.setString(1, usuario.getUsuario());
            prepare.setString(2, usuario.getClave());

            prepare.executeUpdate();

            // Confirmar manualmente la transacción
            con.commit();

            return true;
        } catch (SQLException ex) {
            // Manejo de excepciones
            ex.printStackTrace();

            try {
                // Si se produce una excepción, realizar un rollback para deshacer la transacción
                if (con != null) {
                    con.rollback();
                }
            } catch (SQLException rollbackEx) {
                rollbackEx.printStackTrace();
            }
        } finally {
            try {
                // Restaurar el modo de autocommit a true y cerrar la conexión
                if (con != null) {
                    con.setAutoCommit(true);
                    con.close();
                }
            } catch (SQLException closeEx) {
                closeEx.printStackTrace();
            }
        }

        return false;
    }*/

    
    public boolean agregarUsuario(Usuario usuario) {
        try {
            Connection cn = (Connection) DriverManager.getConnection("jdbc:mysql://127.0.0.1/db_sistema_transporte", "root", "");
            PreparedStatement sentencia = (PreparedStatement) cn.prepareStatement("INSERT INTO " + TB_USUARIOS + " (" + USUARIO + ", " + CONTRASENIA + ") VALUES (?, ?)");
            
            sentencia.setString(1, usuario.getUsuario());
            sentencia.setString(2, usuario.getClave());
            sentencia.execute();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
