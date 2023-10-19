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
    public final static String TOKEN = "token_recuperacion";
    public final static String ESTADO = "estado";
    public final static String ESTADO_TOKEN = "estado_token";

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

    public boolean agregarUsuario(Usuario usuario) {
        try {
            Connection cn = (Connection) DriverManager.getConnection("jdbc:mysql://127.0.0.1/db_sistema_transporte", "root", "");
            PreparedStatement sentencia = (PreparedStatement) cn.prepareStatement("INSERT INTO " + TB_USUARIOS + " (" + USUARIO + ", " + CONTRASENIA + ", "
                    + TOKEN + ", " + ESTADO+ ", " + ESTADO_TOKEN + ") VALUES (?, ?, ?, ?, ?)");

            sentencia.setString(1, usuario.getUsuario());
            sentencia.setString(2, usuario.getClave());
            sentencia.setString(3, usuario.getToken_recuperacion());
            sentencia.setInt(4, usuario.getEstado());
            sentencia.setInt(5, 0);
            sentencia.execute();
            System.out.println("\n llego a la data a registrar nuevo usuario ");

            return true;
        } catch (Exception e) {
            System.out.println("\n error: " + e.toString());
            return false;
        }
    }

    public boolean buscarEmail(String email) {
        boolean encontrado = false;
        String query = "SELECT COUNT(*) FROM " + TB_USUARIOS + " WHERE " + USUARIO + " = ?";
        Connection con = getConexion();

        try {
            PreparedStatement prepared = con.prepareStatement(query);
            prepared.setString(1, email);
            ResultSet result = prepared.executeQuery();
            if (result.next()) {
                int count = result.getInt(1);
                encontrado = (count == 1);
            }

            prepared.close();
        } catch (SQLException ex) {
            Logger.getLogger(DataLogin.class.getName()).log(Level.SEVERE, null, ex);
        }

        return encontrado;
    }

    public boolean asociarTokenRecuperacion(String email, String token, int estadoToken) {
        Connection con = getConexion();
        String query = "UPDATE " + TB_USUARIOS + " SET " + TOKEN + " = ?, " + ESTADO_TOKEN + " = ? WHERE " + USUARIO + " = ?";

        try (PreparedStatement prepared = con.prepareStatement(query)) {
            prepared.setString(1, token);
            prepared.setInt(2, estadoToken);
            prepared.setString(3, email);
            int rowsUpdated = prepared.executeUpdate();

            return rowsUpdated > 0;
        } catch (SQLException ex) {
            ex.printStackTrace();

            return false;
        }
    }

    public boolean verificarYActualizarContraseniaConToken(String token, String nuevaContrasenia) {
        Connection con = getConexion();
        String query = "UPDATE " + TB_USUARIOS + " SET " + CONTRASENIA + " = ?, " + TOKEN + " = '', " + ESTADO_TOKEN + " = 0 WHERE " + TOKEN + " = ?";

        try (PreparedStatement prepared = con.prepareStatement(query)) {
            prepared.setString(1, nuevaContrasenia);
            prepared.setString(2, token);
            int rowsUpdated = prepared.executeUpdate();

            return rowsUpdated > 0;
        } catch (SQLException ex) {
            ex.printStackTrace();
            return false;
        }
    }

    public boolean validarEstadoToken(String usuario) {
        String query = "SELECT " + ESTADO_TOKEN + " FROM " + TB_USUARIOS + " WHERE " + USUARIO + " = ?";
        Connection con = getConexion();

        try (PreparedStatement prepared = con.prepareStatement(query)) {
            prepared.setString(1, usuario);
            ResultSet result = prepared.executeQuery();

            if (result.next()) {
                int estadoToken = result.getInt(ESTADO_TOKEN);
                return estadoToken == 1;
            } else {
                return false;
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
            return false;
        }
    }

    public boolean actualizarEstadoToken(String correo) {
        Connection con = getConexion();
        String query = "UPDATE " + TB_USUARIOS + " SET " + ESTADO_TOKEN + " = 0 WHERE " + USUARIO + " = ?";
        System.out.println("entroooo");
        try (PreparedStatement prepared = con.prepareStatement(query)) {
            prepared.setString(1, correo);
            int rowsUpdated = prepared.executeUpdate();

            return rowsUpdated > 0;
        } catch (SQLException ex) {
            ex.printStackTrace();

            return false;
        }
    }
}
