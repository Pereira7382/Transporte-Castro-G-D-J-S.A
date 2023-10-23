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
        
        return gastos.obtenerGastosAceite();
    }
    
    /*
    public void imprimirGastosAceite() {
        LinkedList<GastosAceite> listaGastos = obtenerGastoAceite();
        
        for (GastosAceite gasto : listaGastos) {
            System.out.println("ID: " + gasto.getId());
            System.out.println("Número de Factura: " + gasto.getNumeroFactura());
            System.out.println("Fecha: " + gasto.getFecha());
            System.out.println("Monto: " + gasto.getMonto());
            System.out.println("Placa: " + gasto.getPlaca());
            System.out.println("Proveedor: " + gasto.getProveedor());
            System.out.println("Marca: " + gasto.getMarca());
            System.out.println("Kilometraje: " + gasto.getKilometraje());
            System.out.println("Duración: " + gasto.getDuracion());
            System.out.println("-----------------------------");
        }
    }
    
   */
    
    }
    


