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
    
    
    public List<Inventario> obtenerInventarioPorProveedor(int idProveedor) {
        DataInventario acceso = new DataInventario();
        return acceso.obtenerInventarioPorIdProveedor(idProveedor);
    }
    
    
}
