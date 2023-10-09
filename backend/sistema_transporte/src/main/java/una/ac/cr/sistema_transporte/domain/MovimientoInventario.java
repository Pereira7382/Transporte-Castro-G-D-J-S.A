
package una.ac.cr.sistema_transporte.domain;

public class MovimientoInventario {
    private int id;
    private String descripcion;
    private String tipo_movimiento;
    private int cantidad;
    private int id_pieza;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTipo_movimiento() {
        return tipo_movimiento;
    }

    public void setTipo_movimiento(String tipo_movimiento) {
        this.tipo_movimiento = tipo_movimiento;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public int getId_pieza() {
        return id_pieza;
    }

    public void setId_pieza(int id_pieza) {
        this.id_pieza = id_pieza;
    }

    public MovimientoInventario(int id, String descripcion, String tipo_movimiento, int cantidad, int id_pieza) {
        this.id = id;
        this.descripcion = descripcion;
        this.tipo_movimiento = tipo_movimiento;
        this.cantidad = cantidad;
        this.id_pieza = id_pieza;
    }

    public MovimientoInventario() {
    }
}
