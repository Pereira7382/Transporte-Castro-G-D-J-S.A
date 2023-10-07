/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.jpa;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import una.ac.cr.sistema_transporte.domain.Proveedor;
import una.ac.cr.sistema_transporte.repository.proveedorRepository;
import una.ac.cr.sistema_transporte.service.proveedorService;

/**
 *
 * @author Fernanda Gonzalez
 */
@Service
@Primary
public class proveedorJPA implements proveedorService{
    
      @Autowired
    private proveedorRepository proveedorRepository;

    @Override
    public void insertarProveedor(Proveedor proveedor) {
        proveedorRepository.save(proveedor);
         System.out.println("\n llego JPAAA ");
    }

    @Override
    public List<Proveedor> listarProveedor() {
        return proveedorRepository.findAll();
    }

    @Override
    public Optional<Proveedor> obtenerProveedorPorId(int id) {
        return proveedorRepository.findById(id);
    }

    @Override
    public void eliminarProveedor(int id) {
        proveedorRepository.deleteById(id);
    }
    
    @Override
    public void actualizarProveedor(Proveedor proveedor) {
        System.out.println("\n llego a actualizar al JPAAA ");
        proveedorRepository.save(proveedor);
        System.out.println("\n EJECUTO EL actualizar ");
    }
    
    
}
