/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.domain;

/**
 *
 * @author josep
 */
public class DatosConsumoLLantas {
    
    double totalGastosParaCamion;
    double promedioGastoPorKilometro;
    int duracionLLantasParaCamion;
    int cantidadRemplazo;
    double vidaUtilRestante;

    public DatosConsumoLLantas() {
    }

    public DatosConsumoLLantas(double totalGastosParaCamion, double promedioGastoPorKilometro, int duracionLLantasParaCamion, int cantidadRemplazo, double vidaUtilRestante) {
        this.totalGastosParaCamion = totalGastosParaCamion;
        this.promedioGastoPorKilometro = promedioGastoPorKilometro;
        this.duracionLLantasParaCamion = duracionLLantasParaCamion;
        this.cantidadRemplazo = cantidadRemplazo;
        this.vidaUtilRestante = vidaUtilRestante;
    }

    public double getTotalGastosParaCamion() {
        return totalGastosParaCamion;
    }

    public void setTotalGastosParaCamion(double totalGastosParaCamion) {
        this.totalGastosParaCamion = totalGastosParaCamion;
    }

    public double getPromedioGastoPorKilometro() {
        return promedioGastoPorKilometro;
    }

    public void setPromedioGastoPorKilometro(double promedioGastoPorKilometro) {
        this.promedioGastoPorKilometro = promedioGastoPorKilometro;
    }

    public int getDuracionLLantasParaCamion() {
        return duracionLLantasParaCamion;
    }

    public void setDuracionLLantasParaCamion(int duracionLLantasParaCamion) {
        this.duracionLLantasParaCamion = duracionLLantasParaCamion;
    }

    public int getCantidadRemplazo() {
        return cantidadRemplazo;
    }

    public void setCantidadRemplazo(int cantidadRemplazo) {
        this.cantidadRemplazo = cantidadRemplazo;
    }

    public double getVidaUtilRestante() {
        return vidaUtilRestante;
    }

    public void setVidaUtilRestante(double vidaUtilRestante) {
        this.vidaUtilRestante = vidaUtilRestante;
    }

    
}
