package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import una.ac.cr.sistema_transporte.domain.GastoAceite;
import una.ac.cr.sistema_transporte.domain.GastosAceite;

public class DataGastoAceite extends DataBase {
    public final static String TABLAGASTOSACEITE = "gasto_aceite";
    public final static String ID = "id";
    public final static String FACTURA = "numero_factura";
    public final static String MONTO = "monto";
    public final static String FECHA = "fecha";
    public final static String ID_CAMION = "id_camion";
    public final static String ID_ACEITE = "id_aceite";
    public final static String ESTADO = "estado";
    public final static String NUMEROFACTURA = "numero_factura";
    public final static String PLACA="matricula";
    public final static String PROVEEDOR="contacto";
    public final static String MARCA="marca";
    public final static String KILOMETRAJE="kilometraje";
    public final static String DURACION="duracion";

    public boolean agregar(GastoAceite gasto) {
        try {
            Connection cn = getConexion();
            String query = "INSERT INTO " + TABLAGASTOSACEITE + " (" + FACTURA + ", " + MONTO + ", " + FECHA + ", " + ID_CAMION + ", " + ID_ACEITE + ", " + ESTADO + ") VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement preparedStatement = cn.prepareStatement(query);
            preparedStatement.setString(1, gasto.getNumero_factura());
            preparedStatement.setDouble(2, gasto.getMonto());
            preparedStatement.setDate(3, new java.sql.Date(gasto.getFecha().getTime()));
            preparedStatement.setInt(4, gasto.getId_camion());
            preparedStatement.setInt(5, gasto.getId_aceite());
            preparedStatement.setString(6,String.valueOf( gasto.getEstado()));
            preparedStatement.executeUpdate();
            return true;
        } catch (SQLException e) {
            System.out.println("\n  error encontrado : " + e.toString());
            return false;
        }
    }
    
    
    /*
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
    }*/
    
    public LinkedList<GastosAceite> obtenerGastosAceite() {
    LinkedList<GastosAceite> listaGastosAceite = new LinkedList<>();
    Connection connection = getConexion();
    
    String query = "SELECT g.id, g.numero_factura, g.fecha, g.monto, c.matricula, p.contacto, a.marca, c.kilometraje, a.duracion " +
                   "FROM " + TABLAGASTOSACEITE + " g " +
                   "INNER JOIN tb_camion c ON g.id_camion = c.id " +
                   "INNER JOIN aceite a ON g.id_aceite = a.id " +
                   "INNER JOIN proveedor p ON a.id_proveedor = p.id_proveedor " +
                   "WHERE g.estado = 1";  // Agrega la cláusula WHERE para filtrar por estado igual a 1

    try {  
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
            listaGastosAceite.add(gasto);
        }
    } catch (SQLException e) {
        System.out.println("Ocurrió un error al conectarse con la base de datos");
    }

    return listaGastosAceite;
}

    
     
      public boolean eliminarGastoAceite(int id){
        Connection cn = getConexion();
        String query = "UPDATE " + TABLAGASTOSACEITE + " SET estado = ? WHERE id = ?";
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
    
   
    
}
