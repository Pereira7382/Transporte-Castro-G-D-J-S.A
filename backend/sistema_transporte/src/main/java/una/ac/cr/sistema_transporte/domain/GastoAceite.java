package una.ac.cr.sistema_transporte.domain;

import java.sql.Date;
import java.util.List;

public class GastoAceite {

    private int id;
    private Date fecha;
    private double monto;
    private int estado;
    private int id_camion;
    private Camion camion;
    private int id_aceite;
    private Aceite aceite;
    private int km_momento;
    private String numero_factura;
    private List<RellenoAceite> rellenos;

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

    public Camion getCamion() {
        return camion;
    }

    public void setCamion(Camion camion) {
        this.camion = camion;
    }

    public int getId_aceite() {
        return id_aceite;
    }

    public void setId_aceite(int id_aceite) {
        this.id_aceite = id_aceite;
    }

    public Aceite getAceite() {
        return aceite;
    }

    public void setAceite(Aceite aceite) {
        this.aceite = aceite;
    }

    public int getKm_momento() {
        return km_momento;
    }

    public void setKm_momento(int km_momento) {
        this.km_momento = km_momento;
    }

    public String getNumero_factura() {
        return numero_factura;
    }

    public void setNumero_factura(String numero_factura) {
        this.numero_factura = numero_factura;
    }

    public List<RellenoAceite> getRellenos() {
        return rellenos;
    }

    public void setRellenos(List<RellenoAceite> rellenos) {
        this.rellenos = rellenos;
    }

    public GastoAceite(int id, Date fecha, double monto, int estado, int id_camion, Camion camion, int id_aceite, Aceite aceite, int km_momento, String numero_factura) {
        this.id = id;
        this.fecha = fecha;
        this.monto = monto;
        this.estado = estado;
        this.id_camion = id_camion;
        this.camion = camion;
        this.id_aceite = id_aceite;
        this.aceite = aceite;
        this.km_momento = km_momento;
        this.numero_factura = numero_factura;
    }

    public GastoAceite() {
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("GastoAceite{")
                .append("id=").append(id)
                .append(", fecha=").append(fecha)
                .append(", monto=").append(monto)
                .append(", estado=").append(estado)
                .append(", km_momento=").append(km_momento)
                .append(", camion=").append(camion.getMatricula())
                .append(", km actual=").append(camion.getKilometraje())
                .append(", prom cons aceite=").append(camion.getPromedio_consumo_aceite())
                .append(", aceite=").append(aceite.getMarca())
                .append(", caducidad=").append(aceite.getDuracion())
                .append(", numero_factura='").append(numero_factura).append('\'')
                .append(", rellenos=[");

        if (rellenos != null) {
            for (RellenoAceite relleno : rellenos) {
                sb.append("\n  ").append(relleno);
            }
        }

        sb.append("]\n}");

        return sb.toString();
    }

}
