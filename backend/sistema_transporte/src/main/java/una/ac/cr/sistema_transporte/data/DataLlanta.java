/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import una.ac.cr.sistema_transporte.domain.Llanta;

public class DataLlanta extends DataBase {

    public final static String TABLALLANTA = "llanta";
    public final static String ID = "id";
    public final static String MARCA = "marca";
    public final static String ESTADO = "estado";
    public final static String DESCRIPCION = "descripcion";
    public final static String DURACION = "duracion";
    public final static String PROVEEDOR = "id_proveedor";

    public LinkedList<Llanta> listar() {
        try {
            Connection cn = getConexion();
            String query = "SELECT l.id, l.marca, l.estado, l.descripcion, l.duracion, p.contacto as contactoProveedor"
                    + " FROM llanta l"
                    + " INNER JOIN proveedor p ON l.id_proveedor = p.id_proveedor";
            PreparedStatement pst = cn.prepareStatement(query);
            ResultSet rs = pst.executeQuery();

            LinkedList<Llanta> listaLlantas = new LinkedList<>();

            while (rs.next()) {
                Llanta llanta = new Llanta();
                llanta.setId(rs.getInt("id"));
                llanta.setMarca(rs.getString("marca"));
                llanta.setEstado(rs.getInt("estado"));
                llanta.setDescripcion(rs.getString("descripcion"));
                llanta.setDuracion(rs.getInt("duracion"));
                llanta.setContactoProveedor(rs.getString("contactoProveedor"));

                listaLlantas.add(llanta);
            }

            return listaLlantas;
        } catch (SQLException e) {
            System.out.println("\n  error encontrado : " + e.toString());
            return null;
        }
    }

    public LinkedList<Llanta> obtenerLlanta() {
        LinkedList<Llanta> lista = new LinkedList<>();
        try {
            Connection cn = getConexion();
            String query = "SELECT g.id, g.marca, g.descripcion, g.duracion, g.estado, P.contacto 'nombre' FROM llanta as g INNER JOIN proveedor P ON g.id_proveedor = P.id_proveedor WHERE g.estado = 1 ORDER BY g.id ASC";
            PreparedStatement preparedStatement = cn.prepareStatement(query);
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                Llanta llanta = new Llanta();
                llanta.setId(rs.getInt(ID));
                llanta.setMarca(rs.getString(MARCA));
                llanta.setDescripcion(rs.getString(DESCRIPCION));
                llanta.setDuracion(rs.getInt(DURACION));
                llanta.setEstado(rs.getInt(ESTADO));
                llanta.setContactoProveedor(rs.getString("nombre"));
                lista.add(llanta);
            }
        } catch (SQLException e) {
            System.out.println("Ocurrio un error al establecer la conexion con la base de datos");
        }
        return lista;
    }

    public boolean eliminarLlantas(int id) {
        Connection cn = getConexion();
        String query = "UPDATE " + TABLALLANTA + " SET estado = ? WHERE id = ?";
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

    public boolean agregarLlanta(Llanta llanta) {
        try {
            Connection cn = getConexion();
            String query = "INSERT INTO " + TABLALLANTA + " (" + MARCA + ", " + DESCRIPCION + ", " + DURACION + ", " + PROVEEDOR + ", " + ESTADO + ") VALUES (?, ?, ?, ?, ?)";
            PreparedStatement preparedStatement = cn.prepareStatement(query);
            preparedStatement.setString(1, llanta.getMarca());
            preparedStatement.setString(2, llanta.getDescripcion());
            preparedStatement.setInt(3, llanta.getDuracion());
            preparedStatement.setInt(4, llanta.getProveedor());
            preparedStatement.setInt(5, llanta.getEstado());
            preparedStatement.execute();
            return true;
        } catch (SQLException e) {
            System.out.println("\n  error encontrado : " + e.toString());
            return false;
        }
    }

    public List<Llanta> obtenerInventarioPorIdProveedor(int idProveedor) {
        List<Llanta> LlantaList = new ArrayList<>();
        Connection con = getConexion();

        String query = "SELECT * FROM " + TABLALLANTA + " WHERE " + PROVEEDOR + " = ?";

        try {
            PreparedStatement prepare = con.prepareStatement(query);
            prepare.setInt(1, idProveedor);
            ResultSet result = prepare.executeQuery();

            while (result.next()) {
                Llanta llanta = new Llanta();
                llanta.setId(result.getInt(ID));
                llanta.setMarca(result.getString(MARCA));
                llanta.setDescripcion(result.getString(DESCRIPCION));
                llanta.setDuracion(result.getInt(DURACION));
                llanta.setEstado(result.getInt(ESTADO));

                LlantaList.add(llanta);

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

    public boolean actualizarLlanta(Llanta llanta) {
        boolean actualizo = false;
        try {
            Connection cn = getConexion();
            String query = "UPDATE " + TABLALLANTA + " SET marca = ?, descripcion = ?, duracion = ?, id_proveedor = ? WHERE id = ?";
            PreparedStatement prepare = cn.prepareStatement(query);
            prepare.setString(1, llanta.getMarca());
            prepare.setString(2, llanta.getDescripcion());
            prepare.setInt(3, llanta.getDuracion());
            prepare.setInt(4, llanta.getProveedor());
            prepare.setInt(5, llanta.getId());
            prepare.execute();
            actualizo = true;
        } catch (Exception e) {
            System.out.println("Ocurrio un error al conectar con la base de datos" + e.getMessage());
        }
        return actualizo;
    }

}
