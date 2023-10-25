/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.Logica;

import java.util.LinkedList;
import una.ac.cr.sistema_transporte.data.DataGastoAceite;
import una.ac.cr.sistema_transporte.data.DataGastosAceite;
import una.ac.cr.sistema_transporte.domain.GastoAceite;
import una.ac.cr.sistema_transporte.domain.GastosAceite;

public class LogicaGastoAceite {
    DataGastoAceite data = new DataGastoAceite();
    DataGastosAceite gastos = new DataGastosAceite();
    
    public boolean agregar(GastoAceite gasto){
        return data.agregar(gasto);
    }
    
    
    public LinkedList<GastosAceite> obtenerGastoAceite(){
        
        return data.obtenerGastosAceite();
    }
   
    public boolean eliminarGastosAceite(int id){
        return data.eliminarGastoAceite(id);
    }
    
    
    
    }
    


