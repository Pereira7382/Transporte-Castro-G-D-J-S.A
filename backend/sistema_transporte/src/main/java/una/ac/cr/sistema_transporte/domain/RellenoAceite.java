
package una.ac.cr.sistema_transporte.domain;

import java.sql.Date;

public class RellenoAceite {
    private int id;
    private double cantidad;
    private String observaciones;
    private int id_mantenimiento;
    private Date fecha;

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public RellenoAceite(int id, double cantidad, String observaciones, int id_mantenimiento, Date fecha) {
        this.id = id;
        this.cantidad = cantidad;
        this.observaciones = observaciones;
        this.id_mantenimiento = id_mantenimiento;
        this.fecha = fecha;
    }

    public RellenoAceite() {
    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getCantidad() {
        return cantidad;
    }

    public void setCantidad(double cantidad) {
        this.cantidad = cantidad;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public int getId_mantenimiento() {
        return id_mantenimiento;
    }

    public void setId_mantenimiento(int id_mantenimiento) {
        this.id_mantenimiento = id_mantenimiento;
    }
    
    
}
