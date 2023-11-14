package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import una.ac.cr.sistema_transporte.domain.Aceite;
import una.ac.cr.sistema_transporte.domain.Camion;
import una.ac.cr.sistema_transporte.domain.GastoAceite;
import una.ac.cr.sistema_transporte.domain.GastosAceite;
import una.ac.cr.sistema_transporte.domain.RellenoAceite;

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
    public final static String PLACA = "matricula";
    public final static String PROVEEDOR = "contacto";
    public final static String MARCA = "marca";
    public final static String KILOMETRAJE = "kilometraje";
    public final static String KILOMETRAJE_MOMENTO = "km_momento";
    public final static String DURACION = "duracion";

    public boolean agregar(GastoAceite gasto) {
        try {
            Connection cn = getConexion();
            String query = "INSERT INTO " + TABLAGASTOSACEITE + " (" + FACTURA + ", " + MONTO + ", " + FECHA + ", " + ID_CAMION + ", " + ID_ACEITE + ", " + KILOMETRAJE_MOMENTO + ", " + ESTADO + ") VALUES (?, ?, ?, ?, ?, ?,?)";
            PreparedStatement preparedStatement = cn.prepareStatement(query);
            preparedStatement.setString(1, gasto.getNumero_factura());
            preparedStatement.setDouble(2, gasto.getMonto());
            preparedStatement.setDate(3, new java.sql.Date(gasto.getFecha().getTime()));
            preparedStatement.setInt(4, gasto.getId_camion());
            preparedStatement.setInt(5, gasto.getId_aceite());
            preparedStatement.setInt(6, gasto.getKm_momento());
            preparedStatement.setString(7, String.valueOf(gasto.getEstado()));
            preparedStatement.executeUpdate();
            return true;
        } catch (SQLException e) {
            System.out.println("\n  error encontrado : " + e.toString());
            return false;
        }
    }

    public LinkedList<GastosAceite> obtenerGastosAceite() {
        LinkedList<GastosAceite> listaGastosAceite = new LinkedList<>();
        Connection connection = getConexion();

        String query = "SELECT g.id, g.numero_factura,g.km_momento, g.fecha, g.monto, c.matricula, p.contacto, a.marca, c.kilometraje, a.duracion "
                + "FROM " + TABLAGASTOSACEITE + " g "
                + "INNER JOIN tb_camion c ON g.id_camion = c.id "
                + "INNER JOIN aceite a ON g.id_aceite = a.id "
                + "INNER JOIN proveedor p ON a.id_proveedor = p.id_proveedor "
                + "WHERE g.estado = 1";  // Agrega la cláusula WHERE para filtrar por estado igual a 1

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
                gasto.setKilometrajeActual(resultSet.getFloat(KILOMETRAJE_MOMENTO));
                gasto.setDuracion(resultSet.getInt(DURACION));
                listaGastosAceite.add(gasto);
            }
        } catch (SQLException e) {
            System.out.println("Ocurrió un error al conectarse con la base de datos");
        }

        return listaGastosAceite;
    }

    public boolean eliminarGastoAceite(int id) {
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

    public boolean agregarRelleno(RellenoAceite relleno) {
        try {
            Connection cn = getConexion();
            String query = "INSERT INTO relleno_aceite (mantenimiento, cantidad,monto, observaciones,km_momento_relleno, fecha) VALUES (?, ?,?, ?, ?,?)";
            PreparedStatement preparedStatement = cn.prepareStatement(query);
            preparedStatement.setInt(1, relleno.getId_mantenimiento());
            preparedStatement.setDouble(2, relleno.getCantidad());
            preparedStatement.setInt(3, relleno.getMonto());
            preparedStatement.setString(4, relleno.getObservaciones());
            preparedStatement.setInt(5, relleno.getKm_momento());
            preparedStatement.setDate(6, new java.sql.Date(relleno.getFecha().getTime()));
            preparedStatement.executeUpdate();
            return true;
        } catch (SQLException e) {
            System.out.println("\n  error encontrado : " + e.toString());
            return false;
        }
    }

    public GastoAceite ultimoMantenimiento(String matricula) {
        GastoAceite ultimoMantenimiento = null;
        Camion camion = null;
        Aceite aceite = null;
        Connection connection = getConexion();

        String query = "SELECT g.id, g.numero_factura, g.km_momento, g.fecha, g.monto, "
                + "c.matricula, a.marca, c.kilometraje, a.duracion,c.capacidad_aceite,"
                + " c.promedio_consumo_aceite "
                + "FROM " + TABLAGASTOSACEITE + " g "
                + "INNER JOIN tb_camion c ON g.id_camion = c.id "
                + "INNER JOIN aceite a ON g.id_aceite = a.id "
                + "INNER JOIN proveedor p ON a.id_proveedor = p.id_proveedor "
                + "WHERE g.estado = 1 AND c.matricula = ? "
                + "ORDER BY g.fecha DESC LIMIT 1";

        try {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, matricula);  // Agrega el parámetro para la matrícula
            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                ultimoMantenimiento = new GastoAceite();
                camion = new Camion();
                aceite = new Aceite();

                ultimoMantenimiento.setId(resultSet.getInt(ID));
                ultimoMantenimiento.setNumero_factura(resultSet.getString(NUMEROFACTURA));
                ultimoMantenimiento.setFecha(resultSet.getDate(FECHA));
                ultimoMantenimiento.setMonto(resultSet.getDouble(MONTO));
                ultimoMantenimiento.setKm_momento(resultSet.getInt(KILOMETRAJE_MOMENTO));

                // Obtener datos del aceite
                aceite.setDuracion(resultSet.getInt(DURACION));
                aceite.setMarca(resultSet.getString(MARCA));
                ultimoMantenimiento.setAceite(aceite);

                // Obtener datos del camión
                camion.setKilometraje(resultSet.getInt(KILOMETRAJE));
                camion.setMatricula(resultSet.getString(PLACA));
                camion.setCapacidad_aceite(resultSet.getInt("capacidad_aceite"));
                //capacidad_aceite
                camion.setPromedio_consumo_aceite(resultSet.getInt("promedio_consumo_aceite"));
                ultimoMantenimiento.setCamion(camion);
            }
        } catch (SQLException e) {
            System.out.println("eerroro: " + e.toString());
        }

        return ultimoMantenimiento;
    }

    public int obtenerKilometrajeActualPorMantenimiento(int idMantenimiento) {
        int kilometrajeActual = -1; // Valor por defecto si no se encuentra ningún resultado
        Connection connection = getConexion();

        String query = "SELECT c." + KILOMETRAJE + " FROM " + TABLAGASTOSACEITE + " g "
                + "INNER JOIN tb_camion c ON g." + ID_CAMION + " = c.id" + " "
                + "WHERE g." + ID + " = ?";

        try {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, idMantenimiento);
            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                kilometrajeActual = resultSet.getInt(KILOMETRAJE);
            }
        } catch (SQLException e) {
            System.out.println("\n error encontradi: " + e.toString());;
        }

        return kilometrajeActual;
    }

    public List<RellenoAceite> obtenerRellenosMant(int idMantenimiento) {
        List<RellenoAceite> listaRellenos = new LinkedList<>();
        Connection connection = getConexion();

        String query = "SELECT * FROM relleno_aceite WHERE mantenimiento = ?";

        try {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, idMantenimiento);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                RellenoAceite relleno = new RellenoAceite();
                relleno.setId(resultSet.getInt(ID));
                relleno.setId_mantenimiento(resultSet.getInt("mantenimiento"));
                relleno.setCantidad(resultSet.getDouble("cantidad"));
                relleno.setMonto(resultSet.getInt("monto"));
                relleno.setObservaciones(resultSet.getString("observaciones"));
                relleno.setKm_momento(resultSet.getInt("km_momento_relleno"));
                relleno.setFecha(resultSet.getDate(FECHA));
                listaRellenos.add(relleno);
            }
        } catch (SQLException e) {
            System.out.println("\n error encontrado: " + e.toString());
        }

        return listaRellenos;
    }

}
