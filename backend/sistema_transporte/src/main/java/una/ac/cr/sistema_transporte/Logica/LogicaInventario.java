/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.Logica;

import java.util.List;
import una.ac.cr.sistema_transporte.data.DataInventario;
import una.ac.cr.sistema_transporte.domain.Inventario;

/**
 *
 * @author josep
 */
public class LogicaInventario {
    
    DataInventario acceso = new DataInventario();
    public List<Inventario> obtenerInventarioPorProveedor(int idProveedor) {
        return acceso.obtenerInventarioPorIdProveedor(idProveedor);
    }
    
    public List<Inventario> obtenerInventarioConContacto() {
        return acceso.obtenerTodosInventarios();
    }
    
    public boolean actualizarInventario(int id, Inventario inventario){
    
        return acceso.actualizarInventarioPorId(id ,inventario);
    }
    
    public boolean insertarInventario(Inventario inventario){
    
        return acceso.insertarInventario(inventario);
    
    }
   
    
    
}
