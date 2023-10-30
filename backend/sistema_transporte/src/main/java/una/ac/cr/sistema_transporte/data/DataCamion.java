/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.PreparedStatement;

/**
 *
 * @author josep
 */
public class DataCamion extends DataBase{
    
    public final static String TB_CAMION = "tb_camion";
    public final static String MATRICULA = "matricula";
    public final static String KILOMETRAJE = "kilometraje";
    
    public boolean actualizarKilometrajeYMatricula(String matricula, int kilometraje) {
        Connection cn = getConexion();
        String query = "UPDATE " + TB_CAMION + " SET " + KILOMETRAJE + " = ? WHERE " + MATRICULA + " = ?";
        try {
            PreparedStatement sentencia = cn.prepareStatement(query);
            sentencia.setInt(1, kilometraje);
            sentencia.setString(2, matricula);
            int filasAfectadas = sentencia.executeUpdate();
            sentencia.close();
            return filasAfectadas > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } 
    }
    
    
       
    
}
