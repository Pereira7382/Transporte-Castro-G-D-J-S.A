/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.Logica;

import una.ac.cr.sistema_transporte.data.DataGastoAceite;
import una.ac.cr.sistema_transporte.domain.GastoAceite;

public class LogicaGastoAceite {
    DataGastoAceite data = new DataGastoAceite();
    public boolean agregar(GastoAceite gasto){
        return data.agregar(gasto);
    }
}
