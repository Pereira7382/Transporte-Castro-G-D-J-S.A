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
import una.ac.cr.sistema_transporte.domain.Inventario;
import una.ac.cr.sistema_transporte.service.inventarioService;

@Controller
@RequestMapping("/inventario")
@CrossOrigin(origins = "*")
public class inventarioController {
    @Autowired
    private inventarioService inventarioRepository;
    
    @GetMapping
    @ResponseBody
    public List<Inventario> listarInventario() {
        List<Inventario> inventario = inventarioRepository.listarInventario();
        return inventario;
    }
    
    
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Inventario guardarCamion(@RequestBody Inventario inventario) {
        inventarioRepository.insertarInventario(inventario);
        return inventario;
    }
    
    @GetMapping("/{id}")
    @ResponseBody
    public Optional<Inventario> obtenerInventarioPorId(@PathVariable int id) {
        Optional<Inventario> optionalInventario = inventarioRepository.obtenerInventarioPorId(id);
        return optionalInventario;

    }
    
    
       @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> actualizarInventario(@PathVariable int id, @RequestBody Inventario inventarioActualizado) {
        Optional<Inventario> optionalInventario = inventarioRepository.obtenerInventarioPorId(id);

        if (optionalInventario.isPresent()) {
            Inventario inventarioExistente = optionalInventario.get();

            // Actualizar los campos del camionExistente con los datos de camionActualizado
            
            inventarioExistente.setCodigo(inventarioActualizado.getCodigo());
            inventarioExistente.setNombre(inventarioActualizado.getNombre());
            inventarioExistente.setDescripcion(inventarioActualizado.getDescripcion());
            inventarioExistente.setCantidad(inventarioActualizado.getCantidad());
            inventarioExistente.setTipo(inventarioActualizado.getTipo());
            inventarioExistente.setActivo(inventarioActualizado.getActivo());
            
   
            inventarioRepository.actualizarInventario(inventarioExistente);

            return ResponseEntity.ok("Camión actualizado correctamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @ResponseBody
    public void eliminarInventario(@PathVariable int id) {
        System.out.println("\n llego a eliminar a la controlleeeeeeer ");
        inventarioRepository.eliminarInventario(id);
    }
    
}
