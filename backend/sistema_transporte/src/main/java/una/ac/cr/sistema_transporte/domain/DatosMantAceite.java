
package una.ac.cr.sistema_transporte.domain;

import java.sql.Date;

public class DatosMantAceite{
    private Date fecha;
    private int ltConsumidos;
    private double costoXkm;
    private double gastoTotal;
    private double consXkm;
    private int litros;
    private int kmRecorridos;
    private int kmRestantes;
    int caducidad;

    public int getCaducidad() {
        return caducidad;
    }

    public void setCaducidad(int caducidad) {
        this.caducidad = caducidad;
    }
    
    
    

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public int getLtConsumidos() {
        return ltConsumidos;
    }

    public void setLtConsumidos(int ltConsumidos) {
        this.ltConsumidos = ltConsumidos;
    }

    public double getCostoXkm() {
        return costoXkm;
    }

    public void setCostoXkm(double costoXkm) {
        this.costoXkm = costoXkm;
    }

    public double getConsXkm() {
        return consXkm;
    }

    public void setConsXkm(double consXkm) {
        this.consXkm = consXkm;
    }

    public int getLitros() {
        return litros;
    }

    public void setLitros(int litros) {
        this.litros = litros;
    }

    public int getKmRecorridos() {
        return kmRecorridos;
    }

    public void setKmRecorridos(int kmRecorridos) {
        this.kmRecorridos = kmRecorridos;
    }

    public int getKmRestantes() {
        return kmRestantes;
    }

    public void setKmRestantes(int kmRestantes) {
        this.kmRestantes = kmRestantes;
    }

    public DatosMantAceite(Date fecha, int ltConsumidos, double costoXkm, double consXkm, int litros, int kmRecorridos, int kmRestantes) {
        this.fecha = fecha;
        this.ltConsumidos = ltConsumidos;
        this.costoXkm = costoXkm;
        this.consXkm = consXkm;
        this.litros = litros;
        this.kmRecorridos = kmRecorridos;
        this.kmRestantes = kmRestantes;
    }

    public DatosMantAceite() {
    }

    public double getGastoTotal() {
        return gastoTotal;
    }

    public void setGastoTotal(double gastoTotal) {
        this.gastoTotal = gastoTotal;
    }
    
    @Override
    public String toString() {
        return "DatosMantAceite{" +
                "fecha=" + fecha +
                ", ltConsumidos=" + ltConsumidos +
                ", costoXkm=" + costoXkm +
                ", gastoTotal=" + gastoTotal +
                ", consXkm=" + consXkm +
                ", litros=" + litros +
                ", kmRecorridos=" + kmRecorridos +
                ", kmRestantes=" + kmRestantes +
                '}';
    }
    
}
