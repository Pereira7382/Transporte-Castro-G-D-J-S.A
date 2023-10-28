package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import una.ac.cr.sistema_transporte.domain.GastoCombustible;

public class DataGastoCom extends DataBase {

    public final static String TABLAGASTOSC = "gastos_combustible";
    public final static String ID = "id";
    public final static String FACTURA = "numero_factura";
    public final static String MONTO = "monto";
    public final static String MATRICULA = "matricula";
    public final static String PROVEEDOR = "proveedor";
    public final static String KILOMETRAJEANTERIOR = "kilometrajeAnterior";
    public final static String KILOMETRAJEACTUAL = "kilometrajeActual";
    public final static String FECHA = "fecha";
    public final static String LITROS = "litros";
    public final static String ESTADO = "estado";

    public boolean agregar(GastoCombustible gasto) {
        try {
            Connection cn = getConexion();
            String query = "INSERT INTO " + TABLAGASTOSC + " (" + FACTURA + ", " + MONTO + ", " + MATRICULA + ", " + PROVEEDOR + ", "
                    + KILOMETRAJEANTERIOR + ", " + KILOMETRAJEACTUAL + ", " + FECHA + ", " + LITROS + ", " + ESTADO + ") "
                    + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement sentencia = cn.prepareStatement(query);
            // Convierte Date a java.sql.Date
            Date fecha = new Date(gasto.getFecha().getTime());
            sentencia.setString(1, gasto.getNumero_factura());
            sentencia.setDouble(2, gasto.getMonto());
            sentencia.setString(3, gasto.getMatricula());
            sentencia.setInt(4, gasto.getProveedor());
            sentencia.setInt(5, gasto.getKilometrajeAnterior());
            sentencia.setInt(6, gasto.getKilometrajeActual());
            sentencia.setDate(7, fecha);
            sentencia.setDouble(8, gasto.getLitros());
            sentencia.setInt(9, gasto.getEstado());

            sentencia.execute();
            return true;
        } catch (Exception e) {
            System.out.println("\n  error encontrado : " + e.toString());
            return false;
        }
    }

    public boolean actualizarKilometraje(int idCamion, int kilometraje) {
        try {
            Connection cn = getConexion();
            String query = "UPDATE tb_camion SET kilometraje = ? WHERE id = ?";
            PreparedStatement sentencia = cn.prepareStatement(query);
            sentencia.setInt(1, kilometraje);
            sentencia.setInt(2, idCamion);
            sentencia.executeUpdate();
            return true;
        } catch (Exception e) {
            System.out.println("\n  error encontrado : " + e.toString());
            return false;
        }
    }

    public List<GastoCombustible> obtenerGastosCamion(String id) {
        List<GastoCombustible> listaGastos = new ArrayList<>();
        try {
            Connection cn = getConexion();
            String query = "SELECT * FROM " + TABLAGASTOSC + " WHERE " + MATRICULA + " = ? AND " + FECHA + " >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH)";
            PreparedStatement sentencia = cn.prepareStatement(query);
            sentencia.setString(1, id);
            ResultSet resultados = sentencia.executeQuery();

            while (resultados.next()) {
                GastoCombustible gasto = new GastoCombustible();
                gasto.setId(resultados.getInt(ID));
                gasto.setNumero_factura(resultados.getString(FACTURA));
                gasto.setMonto(resultados.getDouble(MONTO));
                gasto.setMatricula(resultados.getString(MATRICULA));
                gasto.setProveedor(resultados.getInt(PROVEEDOR));
                gasto.setKilometrajeAnterior(resultados.getInt(KILOMETRAJEANTERIOR));
                gasto.setKilometrajeActual(resultados.getInt(KILOMETRAJEACTUAL));
                gasto.setFecha(resultados.getDate(FECHA));
                gasto.setLitros(resultados.getDouble(LITROS));
                gasto.setEstado(resultados.getInt(ESTADO));
                listaGastos.add(gasto);
            }
        } catch (Exception e) {
            System.out.println("\n  error encontrado : " + e.toString());
        }
        return listaGastos;
    }

}
