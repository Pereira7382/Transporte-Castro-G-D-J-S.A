package una.ac.cr.sistema_transporte.domain;

import java.sql.Date;

public class RellenoAceite {

    private int id;
    private double cantidad;
    private String observaciones;
    private int id_mantenimiento;
    private int km_momento;
    private int monto;
    private Date fecha;

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

    public int getKm_momento() {
        return km_momento;
    }

    public void setKm_momento(int km_momento) {
        this.km_momento = km_momento;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public RellenoAceite(int id, double cantidad, String observaciones, int id_mantenimiento, int km_momento, Date fecha) {
        this.id = id;
        this.cantidad = cantidad;
        this.observaciones = observaciones;
        this.id_mantenimiento = id_mantenimiento;
        this.km_momento = km_momento;
        this.fecha = fecha;
    }

    public RellenoAceite() {
    }

    public int getMonto() {
        return monto;
    }

    public void setMonto(int monto) {
        this.monto = monto;
    }
    

    @Override
    public String toString() {
        return "RellenoAceite{"
                + "id=" + id
                + ", cantidad=" + cantidad
                 + ", monto=" + monto
                + ", observaciones='" + observaciones + '\''
                + ", id_mantenimiento=" + id_mantenimiento
                + ", km_momento=" + km_momento
                + ", fecha=" + fecha
                + '}';
    }

}
