
package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import una.ac.cr.sistema_transporte.domain.GastoLlanta;

public class DataGastoLlanta extends DataBase{
    public final static String TABLAGASTOSLLANTA = "gasto_rodaje_llantas";
    public final static String ID = "id";
    public final static String FACTURA = "numero_factura";
    public final static String MONTO = "monto";
    public final static String FECHA = "fecha";
    public final static String KILOMETRAJEALMOMENTO="kilometrajeAlMomento";
    public final static String ID_CAMION = "id_camion";
    public final static String ID_LLANTA = "id_llanta";
    public final static String ESTADO = "estado";
    
    public boolean agregar(GastoLlanta gasto) {
        try {
            Connection cn = getConexion();
            String query = "INSERT INTO " + TABLAGASTOSLLANTA + " (" + FACTURA + ", " + MONTO + ", " + FECHA + ", " + ID_CAMION + ", " + ID_LLANTA + ", " + KILOMETRAJEALMOMENTO + ", " + ESTADO + ") VALUES (?, ?, ?, ?, ?,?, ?)";
            PreparedStatement preparedStatement = cn.prepareStatement(query);
            preparedStatement.setString(1, gasto.getNumero_factura());
            preparedStatement.setDouble(2, gasto.getMonto());
            preparedStatement.setDate(3, new java.sql.Date(gasto.getFecha().getTime()));
            preparedStatement.setInt(4, gasto.getId_camion());
            preparedStatement.setInt(5, gasto.getId_llanta());
            preparedStatement.setInt(6,gasto.getKilometrajeAnterior());
            preparedStatement.setInt(7,gasto.getEstado());
            preparedStatement.executeUpdate();
            return true;
        } catch (SQLException e) {
            System.out.println("\n  error encontrado : " + e.toString());
            return false;
        }
    }
    
    public LinkedList<GastoLlanta> obtenerGastoLlanta(){
        LinkedList<GastoLlanta> lista = new LinkedList<>();
        try {
            Connection cn = getConexion();
            String query = "SELECT g.id, g.estado, g.numero_factura, g.monto,g.kilometrajeAlMomento, C.matricula, P.contacto, ll.marca, ll.duracion, g.fecha FROM gasto_rodaje_llantas as g INNER JOIN tb_camion C ON C.id = g.id_camion INNER JOIN llanta ll ON ll.id = g.id_llanta INNER JOIN proveedor P ON P.id_proveedor = ll.id_proveedor WHERE g.estado = 1";
            PreparedStatement preparedStatement = cn.prepareStatement(query);
            ResultSet rs = preparedStatement.executeQuery();
            while(rs.next()){
                GastoLlanta gasto = new GastoLlanta();
                gasto.setId(rs.getInt(ID));
                gasto.setNumero_factura(rs.getString(FACTURA));
                gasto.setMonto(rs.getDouble(MONTO));
                gasto.setEstado(rs.getInt(ESTADO));
                gasto.setMatriculaCamion(rs.getString("matricula"));
                gasto.setNombreProveedor(rs.getString("contacto"));
                gasto.setMarcaLlanta(rs.getString("marca"));
                gasto.setKmCamion(rs.getInt(KILOMETRAJEALMOMENTO));
                gasto.setDuracion(rs.getInt("duracion"));
                gasto.setFecha(rs.getDate("fecha"));
                lista.add(gasto);
            }
        } catch (SQLException e) {
            System.out.println("Ocurrio un error al establecer la conexion con la base de datos");
        }
        return lista;
    }
    
    
        public boolean eliminarLlantas(int id){
        Connection cn = getConexion();
        String query = "UPDATE " + TABLAGASTOSLLANTA + " SET estado = ? WHERE id = ?";
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
        

    public int obtenerKilometrajePorMatricula(String matriculaCamion) {
        int kilometraje = 0;
        try {
            Connection cn = getConexion();
            String query = "SELECT " + "kilometraje" + " FROM " + "tb_camion" + " WHERE " + "matricula" + " = ?";
            PreparedStatement preparedStatement = cn.prepareStatement(query);
            preparedStatement.setString(1, matriculaCamion);
            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next()) {
                kilometraje = rs.getInt("kilometraje");
            }
        } catch (SQLException e) {
            System.out.println("Ocurrió un error al obtener el kilometraje del camión con matrícula " + matriculaCamion);
        }
        return kilometraje;
    }

}
