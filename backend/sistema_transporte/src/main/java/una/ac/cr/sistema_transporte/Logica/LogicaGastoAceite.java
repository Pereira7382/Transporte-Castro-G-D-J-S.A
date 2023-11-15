/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.Logica;

import java.util.LinkedList;
import java.util.List;
import una.ac.cr.sistema_transporte.data.DataGastoAceite;
import una.ac.cr.sistema_transporte.domain.GastoAceite;
import una.ac.cr.sistema_transporte.domain.GastosAceite;
import una.ac.cr.sistema_transporte.domain.RellenoAceite;

public class LogicaGastoAceite {

    DataGastoAceite data = new DataGastoAceite();

    public boolean agregar(GastoAceite gasto) {
        return data.agregar(gasto);
    }

    public LinkedList<GastosAceite> obtenerGastoAceite() {

        return data.obtenerGastosAceite();
    }

    public boolean eliminarGastosAceite(int id) {
        return data.eliminarGastoAceite(id);
    }
    
    public boolean agregarRelleno(RellenoAceite relleno){
        return data.agregarRelleno(relleno);
    }
    
    public GastoAceite ultimoMantenimiento(String matricula){
        //obtengo los datos del ultimo mantenimiento
        GastoAceite ultimoMant = data.ultimoMantenimiento(matricula);
        //obtengo todos los rellenos realizados a este mantenimiento
        List<RellenoAceite> rellenos = data.obtenerRellenosMant(ultimoMant.getId());
        ultimoMant.setRellenos(rellenos);
        return ultimoMant;
    }
    
    public int obtenerKilometrajeActualPorMantenimiento(int mantenimiento){
        return data.obtenerKilometrajeActualPorMantenimiento(mantenimiento);
    }
    
    public List<RellenoAceite> listarRellenos(){
        return data.listarRellenos();
    }
    
    public boolean actualizarRelleno(int id, RellenoAceite relleno){
        return data.actualizarRelleno(id, relleno);
    }

}
