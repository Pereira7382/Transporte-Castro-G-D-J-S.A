/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import una.ac.cr.sistema_transporte.domain.Llanta;

public class DataLlanta extends DataBase{
    public final static String TABLALLANTA = "aceite";
    public final static String ID = "id";
    public final static String MARCA = "marca";
    public final static String ESTADO = "estado";
    public final static String DESCRIPCION = "descripcion";
    public final static String DURACION = "duracion";
    public final static String PROVEEDOR = "id_proveedor";
    
    public LinkedList<Llanta> listar() {
        try {
            Connection cn = getConexion();
            String query = "SELECT l.id, l.marca, l.estado, l.descripcion, l.duracion, p.contacto as contactoProveedor" +
                           " FROM llanta l" +
                           " INNER JOIN proveedor p ON l.id_proveedor = p.id_proveedor";
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
}
