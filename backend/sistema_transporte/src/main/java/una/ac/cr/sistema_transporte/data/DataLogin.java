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
            PreparedStatement sentencia = (PreparedStatement) cn.prepareStatement("INSERT INTO " + TB_USUARIOS + " (" + USUARIO + ", " + CONTRASENIA +", "+
                    TOKEN+ ", " + ESTADO + ") VALUES (?, ?, ?, ?)");
            
            sentencia.setString(1, usuario.getUsuario());
            sentencia.setString(2, usuario.getClave());
            sentencia.setString(3, usuario.getToken_recuperacion());
            sentencia.setInt(4, usuario.getEstado());
            sentencia.execute();
            return true;
        } catch (Exception e) {
            System.out.println("\n error: " +  e.toString());
            return false;
        }
    }
}
