
package una.ac.cr.sistema_transporte.domain;

public class DatosConsumoComb {
    private int kmRecorrido;
    private int litrosConsumidos;
    private double promLitKm;
    private double gastoTotal;
    private double gastoPorKm;

    public int getKmRecorrido() {
        return kmRecorrido;
    }

    public void setKmRecorrido(int kmRecorrido) {
        this.kmRecorrido = kmRecorrido;
    }

    public int getLitrosConsumidos() {
        return litrosConsumidos;
    }

    public void setLitrosConsumidos(int litrosConsumidos) {
        this.litrosConsumidos = litrosConsumidos;
    }

    public double getPromLitKm() {
        return promLitKm;
    }

    public void setPromLitKm(double promLitKm) {
        this.promLitKm = promLitKm;
    }

    public double getGastoTotal() {
        return gastoTotal;
    }

    public void setGastoTotal(double gastoTotal) {
        this.gastoTotal = gastoTotal;
    }

    public double getGastoPorKm() {
        return gastoPorKm;
    }

    public void setGastoPorKm(double gastoPorKm) {
        this.gastoPorKm = gastoPorKm;
    }

    public DatosConsumoComb() {
    }

    public DatosConsumoComb(int kmRecorrido, int litrosConsumidos, double promLitKm, double gastoTotal, double gastoPorKm) {
        this.kmRecorrido = kmRecorrido;
        this.litrosConsumidos = litrosConsumidos;
        this.promLitKm = promLitKm;
        this.gastoTotal = gastoTotal;
        this.gastoPorKm = gastoPorKm;
    }
    
    public void imprimirInfo() {
        System.out.println("Kilómetros Recorridos: " + this.kmRecorrido);
        System.out.println("Litros Consumidos: " + this.litrosConsumidos);
        System.out.println("Promedio Litros por Kilómetro: " + this.promLitKm);
        System.out.println("Gasto Total: " + this.gastoTotal);
        System.out.println("Gasto por Kilómetro: " + this.gastoPorKm);
    }
    
    
}
