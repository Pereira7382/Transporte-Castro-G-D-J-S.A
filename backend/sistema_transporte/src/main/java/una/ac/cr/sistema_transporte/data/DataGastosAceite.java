/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import una.ac.cr.sistema_transporte.domain.GastosAceite;

/**
 *
 * @author josep
 */
public class DataGastosAceite extends DataBase {
    
   public final static String TABLAGASTOSACEITE = "gasto_aceite";
    public final static String ID = "id";
    public final static String NUMEROFACTURA = "numero_factura";
    public final static String MONTO = "monto";
    public final static String PLACA="matricula";
    public final static String PROVEEDOR="contacto";
    public final static String MARCA="marca";
    public final static String KILOMETRAJE="kilometraje";
    public final static String DURACION="duracion";
    public final static String FECHA="fecha";
    public final static String ESTADO="estado";
    
    
    
     public LinkedList<GastosAceite> obtenerGastosAceite() {
        LinkedList<GastosAceite> listaGastosAceite = new LinkedList<>();
        Connection connection = getConexion();
        
         String query = "SELECT g.id, g.numero_factura, g.fecha, g.monto, c.matricula, p.contacto, a.marca, c.kilometraje, a.duracion " +
                           "FROM " + TABLAGASTOSACEITE + " g " +
                           "INNER JOIN tb_camion c ON g.id_camion = c.id " +
                           "INNER JOIN aceite a ON g.id_aceite = a.id " +
                           "INNER JOIN proveedor p ON a.id_proveedor = p.id_proveedor";
         
        try{  
          
           
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                GastosAceite gasto = new GastosAceite();
                gasto.setId(resultSet.getInt(ID));
                gasto.setNumero_factura(resultSet.getString(NUMEROFACTURA));
                gasto.setFecha(resultSet.getDate(FECHA));
                gasto.setMonto(resultSet.getDouble(MONTO));
                gasto.setMatricula(resultSet.getString(PLACA));
                gasto.setProveedor(resultSet.getString(PROVEEDOR));
                gasto.setMarca(resultSet.getString(MARCA));
                gasto.setKilometrajeActual(resultSet.getFloat(KILOMETRAJE));
                gasto.setDuracion(resultSet.getInt(DURACION));
             //   GastosAceite gasto = new GastosAceite(id, numeroFactura, monto, placa, proveedor, marca, kilometraje, duracion, fecha);
                listaGastosAceite.add(gasto);
            }
        } catch (SQLException e) {
         System.out.println("Ocurrio un error al conectarse con la base de datos");
        }

        return listaGastosAceite;
    }
    
   
    
}
