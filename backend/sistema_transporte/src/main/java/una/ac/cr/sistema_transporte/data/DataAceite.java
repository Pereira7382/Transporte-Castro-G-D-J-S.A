package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import una.ac.cr.sistema_transporte.domain.Aceite;

public class DataAceite extends DataBase{
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
            String query = "SELECT a.id, a.marca, a.estado, a.descripcion, a.duracion, p.contacto as contactoProveedor" +
                           " FROM aceite a" +
                           " INNER JOIN proveedor p ON a.id_proveedor = p.id_proveedor";
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
}
