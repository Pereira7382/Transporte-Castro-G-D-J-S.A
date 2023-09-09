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
import una.ac.cr.sistema_transporte.domain.Camion;

/**
 *
 * @author josep
 */
public class DataCamion extends DataBase{
    
     public final static String TB_CAMION="tb_camion";
     public final static String ID_CAMION="id_camion";
     public final static String MATRICULA="matricula";
     public final static String MODELO="modelo";
     public final static String ESTADO="estado";
     public final static String ANIO="anio";
     public final static String NUMERO_BIN="numero_bin";
     public final static String KILOMETRAJE="kilometraje";
     public final static String TIPO_CAMION="tipo_camion";
    
    public LinkedList<Camion>obtnerCamiones(){
    
        LinkedList<Camion> camion = new LinkedList<Camion>();
        
        String query = "SELECT * FROM " + TB_CAMION + ";";
        
        Connection con = getConexion();
        
        try {
            PreparedStatement prepared = con.prepareStatement(query);
            ResultSet result = prepared.executeQuery();
            Camion cam = null;
            
            while (result.next()) {
                
                cam = new Camion();
                
                cam.setId_camion(result.getInt(ID_CAMION));
                cam.setMatricula(result.getString(MATRICULA));
                cam.setModelo(result.getString(MODELO));
                cam.setEstado(result.getBoolean(ESTADO));
                cam.setAnio(result.getInt(ANIO));
                cam.setNumero_bin(result.getString(NUMERO_BIN));
                cam.setKilometraje(result.getDouble(KILOMETRAJE));
                cam.setTipo_camion(result.getString(TIPO_CAMION));
                       
                camion.add(cam);
                
            }
            
            prepared.close();
            con.close();
            
        } catch (SQLException ex) {
            Logger.getLogger(DataCamion.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return camion;
        
    
    }
    
}
