/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import una.ac.cr.sistema_transporte.domain.Inventario;

public class DataInventario extends DataBase {

    public final static String TABLAINVENTARIO = "inventario";
    public final static String ID = "id";
    public final static String CODIGO = "codigo";
    public final static String NOMBRE = "nombre";
    public final static String DESCRIPCION = "descripcion";
    public final static String CANTIDAD = "cantidad";
    public final static String TIPO = "tipo";
    public final static String ESTADO = "activo";

    public Inventario obtenerPieza(int id_pieza) {
        Inventario pieza = new Inventario();
        Connection con = getConexion();

        //SELECT * FROM `inventario` WHERE id = 3
        String query = "SELECT * FROM " + TABLAINVENTARIO + " WHERE " + ID + " = " + id_pieza;

        try {
            PreparedStatement prepare = con.prepareStatement(query);
            ResultSet result = prepare.executeQuery();
            
            if (result.next()) {
                pieza = new Inventario();
                pieza.setId(result.getInt(ID));
                pieza.setCantidad(result.getInt(CANTIDAD));
            }
            prepare.close();
            result.close();

        } catch (Exception e) {
            
        }
        return pieza;

    }

    public boolean actualizarPieza(Inventario pieza) {
        Connection con = getConexion();
        String query = "UPDATE " + TABLAINVENTARIO + " SET CANTIDAD = ? WHERE ID = ?";

        try {
            PreparedStatement prepare = con.prepareStatement(query);
            prepare.setInt(1, pieza.getCantidad());
            prepare.setInt(2, pieza.getId());

            prepare.executeUpdate();

            prepare.close();

            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

}
