package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import una.ac.cr.sistema_transporte.domain.Aceite;

public class DataAceite extends DataBase {

    public final static String TABLAACEITE = "aceite";
    public final static String ID = "id";
    public final static String MARCA = "marca";
    public final static String ESTADO = "estado";
    public final static String DESCRIPCION = "descripcion";
    public final static String DURACION = "duracion";
    public final static String PROVEEDOR = "id_proveedor";

    public LinkedList<Aceite> listar() {
        try {
            Connection cn = getConexion();
            String query = "SELECT a.id, a.marca, a.estado, a.descripcion, a.duracion, p.contacto as contactoProveedor"
                    + " FROM aceite a"
                    + " INNER JOIN proveedor p ON a.id_proveedor = p.id_proveedor";
            PreparedStatement pst = cn.prepareStatement(query);
            ResultSet rs = pst.executeQuery();

            LinkedList<Aceite> listaAceites = new LinkedList<>();

            while (rs.next()) {
                Aceite aceite = new Aceite();
                aceite.setId(rs.getInt("id"));
                aceite.setMarca(rs.getString("marca"));
                aceite.setEstado(rs.getInt("estado"));
                aceite.setDescripcion(rs.getString("descripcion"));
                aceite.setDuracion(rs.getInt("duracion"));
                aceite.setContactoProveedor(rs.getString("contactoProveedor"));

                listaAceites.add(aceite);
            }

            return listaAceites;
        } catch (SQLException e) {
            System.out.println("\n  error encontrado : " + e.toString());
            return null;
        }

    }

    public LinkedList<Aceite> obtenerAceite() {
        LinkedList<Aceite> lista = new LinkedList<>();
        try {
            Connection cn = getConexion();
            String query = "SELECT g.id, g.marca, g.descripcion, g.duracion, g.estado, P.contacto 'nombre' FROM aceite as g INNER JOIN proveedor P ON g.id_proveedor = P.id_proveedor WHERE g.estado = 1 ORDER BY g.id ASC";
            PreparedStatement preparedStatement = cn.prepareStatement(query);
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                Aceite aceite = new Aceite();
                aceite.setId(rs.getInt(ID));
                aceite.setMarca(rs.getString(MARCA));
                aceite.setDescripcion(rs.getString(DESCRIPCION));
                aceite.setDuracion(rs.getInt(DURACION));
                aceite.setEstado(rs.getInt(ESTADO));
                aceite.setContactoProveedor(rs.getString("nombre"));
                lista.add(aceite);
            }
        } catch (SQLException e) {
            System.out.println("Ocurrio un error al establecer la conexion con la base de datos");
        }
        return lista;
    }

    public boolean eliminarAceite(int id) {
        Connection cn = getConexion();
        String query = "UPDATE " + TABLAACEITE + " SET estado = ? WHERE id = ?";
        try {
            PreparedStatement prepare = cn.prepareStatement(query);
            prepare.setInt(1, 0);
            prepare.setInt(2, id);
            prepare.executeUpdate();
            prepare.close();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean agregarAceite(Aceite aceite) {
        try {
            Connection cn = getConexion();
            String query = "INSERT INTO " + TABLAACEITE + " (" + MARCA + ", " + DESCRIPCION + ", " + DURACION + ", " + PROVEEDOR + ", " + ESTADO + ") VALUES (?, ?, ?, ?, ?)";
            PreparedStatement preparedStatement = cn.prepareStatement(query);
            preparedStatement.setString(1, aceite.getMarca());
            preparedStatement.setString(2, aceite.getDescripcion());
            preparedStatement.setInt(3, aceite.getDuracion());
            preparedStatement.setInt(4, aceite.getProveedor());
            preparedStatement.setInt(5, aceite.getEstado());
            preparedStatement.execute();
            return true;
        } catch (SQLException e) {
            System.out.println("\n  error encontrado : " + e.toString());
            return false;
        }
    }

    public List<Aceite> obtenerInventarioPorIdProveedor(int idProveedor) {
        List<Aceite> LlantaList = new ArrayList<>();
        Connection con = getConexion();

        String query = "SELECT * FROM " + TABLAACEITE + " WHERE " + PROVEEDOR + " = ?";

        try {
            PreparedStatement prepare = con.prepareStatement(query);
            prepare.setInt(1, idProveedor);
            ResultSet result = prepare.executeQuery();

            while (result.next()) {
                Aceite aceite = new Aceite();
                aceite.setId(result.getInt(ID));
                aceite.setMarca(result.getString(MARCA));
                aceite.setDescripcion(result.getString(DESCRIPCION));
                aceite.setDuracion(result.getInt(DURACION));
                aceite.setEstado(result.getInt(ESTADO));

                LlantaList.add(aceite);

            }

            prepare.close();
            result.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Cerrar la conexión aquí si es necesario
        }

        return LlantaList;
    }

        public boolean actualizarAceite(Aceite aceite) {
        boolean actualizo = false;
        try {
            Connection cn = getConexion();
            String query = "UPDATE " + TABLAACEITE + " SET marca = ?, descripcion = ?, duracion = ?, id_proveedor = ? WHERE id = ?";
            PreparedStatement prepare = cn.prepareStatement(query);
            prepare.setString(1, aceite.getMarca());
            prepare.setString(2, aceite.getDescripcion());
            prepare.setInt(3, aceite.getDuracion());
            prepare.setInt(4, aceite.getProveedor());
            prepare.setInt(5, aceite.getId());
            prepare.execute();
            actualizo = true;
        } catch (Exception e) {
            System.out.println("Ocurrio un error al conectar con la base de datos" + e.getMessage());
        }
        return actualizo;
    }
    
    
    
    
    
}
