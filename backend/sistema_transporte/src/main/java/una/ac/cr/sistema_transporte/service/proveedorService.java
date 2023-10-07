/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package una.ac.cr.sistema_transporte.service;

import java.util.List;
import java.util.Optional;
import una.ac.cr.sistema_transporte.domain.Proveedor;

/**
 *
 * @author Fernanda Gonzalez
 */
public interface proveedorService {
    
    public void insertarProveedor(Proveedor proveedor);
    
    public List<Proveedor> listarProveedor() ;
     
    public Optional<Proveedor>obtenerProveedorPorId( int id);
    
    public void eliminarProveedor(int id);
    
    public void actualizarProveedor(Proveedor proveedor);
    
}
