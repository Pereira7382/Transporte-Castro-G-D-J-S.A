/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import una.ac.cr.sistema_transporte.domain.Proveedor;

import una.ac.cr.sistema_transporte.service.proveedorService;

/**
 *
 * @author Fernanda Gonzalez
 */
@Controller
@RequestMapping("/proveedor")
@CrossOrigin(origins = "*")
public class proveedorController {
    
     @Autowired
    private proveedorService proveedorRepository;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Proveedor guardarProveedor(@RequestBody Proveedor proveedor) {
        System.out.println("llego a la controller");
        proveedorRepository.insertarProveedor(proveedor);
        return proveedor;
    }

    @GetMapping
    @ResponseBody
    public List<Proveedor> mostrarRegistrosProveedor() {
        List<Proveedor> proveedor = proveedorRepository.listarProveedor();
        return proveedor;
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Optional<Proveedor> obtenerCamionPorId(@PathVariable int id) {
        Optional<Proveedor> optionalProveedor = proveedorRepository.obtenerProveedorPorId(id);
        return optionalProveedor;

    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public void eliminarProveedor(@PathVariable int id) {
        System.out.println("\n llego a eliminar a la controlleeeeeeer ");
        proveedorRepository.eliminarProveedor(id);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> actualizarProveedor(@PathVariable int id, @RequestBody Proveedor proveedorActualizado) {
        Optional<Proveedor> optionalProveedor = proveedorRepository.obtenerProveedorPorId(id);

        if (optionalProveedor.isPresent()) {
            Proveedor proveedorExistente = optionalProveedor.get();

            // Actualizar los campos del camionExistente con los datos de camionActualizado
            proveedorExistente.setId_proveedor(proveedorActualizado.getId_proveedor());
            proveedorExistente.setCorreo_electronico(proveedorActualizado.getCorreo_electronico());
            proveedorExistente.setTelefono(proveedorActualizado.getTelefono());
            proveedorExistente.setContacto(proveedorActualizado.getContacto());
            proveedorExistente.setDireccion(proveedorActualizado.getDireccion());
            proveedorExistente.setEstado(proveedorActualizado.getEstado());
           

            proveedorRepository.actualizarProveedor(proveedorExistente);

            return ResponseEntity.ok("proveedor actualizado correctamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
}
