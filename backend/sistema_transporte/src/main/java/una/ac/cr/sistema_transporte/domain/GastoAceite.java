package una.ac.cr.sistema_transporte.domain;

import java.sql.Date;

public class GastoAceite {

    private int id;
    private Date fecha;
    private double monto;
    private int estado;
    private int id_camion;
    private int id_aceite;
    private int km_momento;
    private String numero_factura;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public double getMonto() {
        return monto;
    }

    public void setMonto(double monto) {
        this.monto = monto;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public int getId_camion() {
        return id_camion;
    }

    public void setId_camion(int id_camion) {
        this.id_camion = id_camion;
    }

    public int getId_aceite() {
        return id_aceite;
    }

    public void setId_aceite(int id_aceite) {
        this.id_aceite = id_aceite;
    }

    public String getNumero_factura() {
        return numero_factura;
    }

    public void setNumero_factura(String numero_factura) {
        this.numero_factura = numero_factura;
    }

    public GastoAceite() {
    }

    public GastoAceite(int id, Date fecha, double monto, int estado, int id_camion, int id_aceite, int km_momento, String numero_factura) {
        this.id = id;
        this.fecha = fecha;
        this.monto = monto;
        this.estado = estado;
        this.id_camion = id_camion;
        this.id_aceite = id_aceite;
        this.km_momento = km_momento;
        this.numero_factura = numero_factura;
    }

    public int getKm_momento() {
        return km_momento;
    }

    public void setKm_momento(int km_momento) {
        this.km_momento = km_momento;
    }

    @Override
    public String toString() {
        return "GastoAceite{"
                + "id=" + id
                + ", fecha=" + fecha
                + ", monto=" + monto
                + ", estado=" + estado
                + ", km_momento=" + km_momento
                + ", id_camion=" + id_camion
                + ", id_aceite=" + id_aceite
                + ", numero_factura='" + numero_factura + '\''
                + '}';
    }
}
