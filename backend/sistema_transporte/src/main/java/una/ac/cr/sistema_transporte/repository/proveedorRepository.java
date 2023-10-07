/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package una.ac.cr.sistema_transporte.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import una.ac.cr.sistema_transporte.domain.Proveedor;

/**
 *
 * @author Fernanda Gonzalez
 */
public interface proveedorRepository extends JpaRepository<Proveedor, Integer>{
    
}
