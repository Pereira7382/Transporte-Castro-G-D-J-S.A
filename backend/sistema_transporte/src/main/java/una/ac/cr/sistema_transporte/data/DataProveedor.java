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
import java.util.logging.Level;
import java.util.logging.Logger;


import una.ac.cr.sistema_transporte.domain.Proveedor;

public class DataProveedor extends DataBase{
    
    public final static String PROVEEDOR = "proveedor";
    public final static String ID_PROVEEDOR = "id_proveedor";
    public final static String CORREO_ELECTRONICO = "correo_electronico";
    public final static String TELEFONO = "telefono";
    public final static String CONTACTO = "contacto";
    public final static String DIRECCION = "direccion";
    public final static String ESTADO = "estado";
    

    public LinkedList<Proveedor> obtnerProveedor() {

        LinkedList<Proveedor> proveedo = new LinkedList<Proveedor>();

        String query = "SELECT * FROM " + PROVEEDOR + ";";

        Connection con = getConexion();

        try {
            PreparedStatement prepared = con.prepareStatement(query);
            ResultSet result = prepared.executeQuery();
                Proveedor pro = null;

            while (result.next()) {

                pro = new Proveedor();

                pro.setId_proveedor(result.getInt(ID_PROVEEDOR));
                pro.setCorreo_electronico(result.getString(CORREO_ELECTRONICO));
                pro.setTelefono(result.getString(TELEFONO));
                pro.setContacto(result.getString(CONTACTO));
                pro.setDireccion(result.getString(DIRECCION));
                pro.setEstado(result.getBoolean(ESTADO));
                

                proveedo.add(pro);

            }

            prepared.close();

        } catch (SQLException ex) {
            Logger.getLogger(DataProveedor.class.getName()).log(Level.SEVERE, null, ex);
        }

        return proveedo;

    }

    public Proveedor obtenerPorId(int id) {

        String query = "SELECT * FROM " + PROVEEDOR + " WHERE " + " =?;";
        Connection con = getConexion();

        try {
            PreparedStatement prepare = con.prepareStatement(query);
            prepare.setInt(1, id);
            ResultSet result = prepare.executeQuery();
            Proveedor pro = null;
            if (result.next()) {

                pro = new Proveedor();

                pro.setId_proveedor(result.getInt(ID_PROVEEDOR));
                pro.setCorreo_electronico(result.getString(CORREO_ELECTRONICO));
                pro.setTelefono(result.getString(TELEFONO));
                pro.setContacto(result.getString(CONTACTO));
                pro.setDireccion(result.getString(DIRECCION));
                pro.setEstado(result.getBoolean(ESTADO));

            }
            prepare.close();
            result.close();
            return pro;

        } catch (SQLException ex) {
            Logger.getLogger(DataProveedor.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }

    }

    public void eliminarProveedorPorId(int id) {
        String query = "DELETE FROM " + PROVEEDOR + " WHERE id_proveedor = ?;";
        Connection con = getConexion();
        PreparedStatement prepare = null;

        try {
            prepare = con.prepareStatement(query);
            prepare.setInt(1, id);
            int rowsDeleted = prepare.executeUpdate();
            System.out.println("Filas eliminadas: " + rowsDeleted);
        } catch (SQLException ex) {
            Logger.getLogger(DataProveedor.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    
    public int obtenerIdProveedorPorNombre(String nombre) {
    String query = "SELECT " + ID_PROVEEDOR + " FROM " + PROVEEDOR + " WHERE contacto = ?;";
    Connection con = getConexion();

    try {
        PreparedStatement prepare = con.prepareStatement(query);
        prepare.setString(1, nombre);
        ResultSet result = prepare.executeQuery();
        int idProveedor = -1; // Valor predeterminado si no se encuentra ningún proveedor
        if (result.next()) {
            idProveedor = result.getInt(ID_PROVEEDOR);
        }
        prepare.close();
        result.close();
        return idProveedor;
    } catch (SQLException ex) {
        Logger.getLogger(DataProveedor.class.getName()).log(Level.SEVERE, null, ex);
        return -1; // Valor predeterminado si ocurre un error
    }
}



}
