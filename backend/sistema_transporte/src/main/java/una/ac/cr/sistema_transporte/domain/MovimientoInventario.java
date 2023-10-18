
package una.ac.cr.sistema_transporte.domain;

import java.sql.Date;

public class MovimientoInventario {
    private int id;
    private String descripcion;
    private String tipo_movimiento;
    private int cantidad;
    private int id_pieza;
    private Date fecha_movimiento;
    private boolean estado;

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

    public Date getFecha_movimiento() {
        return fecha_movimiento;
    }

    public void setFecha_movimiento(Date fecha_movimiento) {
        this.fecha_movimiento = fecha_movimiento;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public MovimientoInventario(int id, String descripcion, String tipo_movimiento, int cantidad, int id_pieza, Date fecha_movimiento) {
        this.id = id;
        this.descripcion = descripcion;
        this.tipo_movimiento = tipo_movimiento;
        this.cantidad = cantidad;
        this.id_pieza = id_pieza;
        this.fecha_movimiento = fecha_movimiento;
    }
    public MovimientoInventario() {
    }
}
