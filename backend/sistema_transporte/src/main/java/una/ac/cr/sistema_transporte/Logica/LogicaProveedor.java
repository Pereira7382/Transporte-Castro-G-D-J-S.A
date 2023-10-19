/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.Logica;

import una.ac.cr.sistema_transporte.data.DataProveedor;
import una.ac.cr.sistema_transporte.domain.Proveedor;

/**
 *
 * @author josep
 */
public class LogicaProveedor {
    
    public int obtenerIdProveedor(String nombre){
    
         DataProveedor dataProveedor = new DataProveedor();
         return dataProveedor.obtenerIdProveedorPorNombre(nombre);
        
    
    }
}
