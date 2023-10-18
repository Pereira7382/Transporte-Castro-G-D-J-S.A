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
import una.ac.cr.sistema_transporte.Logica.LogicaInventario;
import una.ac.cr.sistema_transporte.Logica.LogicaProveedor;
import una.ac.cr.sistema_transporte.data.DataInventario;
import una.ac.cr.sistema_transporte.domain.Inventario;
import una.ac.cr.sistema_transporte.domain.Proveedor;
import una.ac.cr.sistema_transporte.service.inventarioService;

@Controller
@RequestMapping("/inventario")
@CrossOrigin(origins = "*")
public class inventarioController {
    @Autowired
    private inventarioService inventarioRepository;
    private DataInventario data = new DataInventario();
    
    
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
        LogicaProveedor logic = new LogicaProveedor();
        String nombreProveedor = inventario.getProvedor(); // Asegúrate de tener el método getNombre() en tu clase Proveedor
        System.out.println(nombreProveedor);
        int id_proveedor =  logic.obtenerIdProveedor(nombreProveedor);
        System.out.println("entroooooo");
        System.out.println(id_proveedor);
        inventario.setId_proveedor(id_proveedor);
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
        Inventario pieza = new Inventario();
        pieza = data.obtenerPieza(id);
        pieza.setActivo(0);
        data.eliminar(pieza);
    }
    
    @GetMapping("/{id}/inventario")
    public ResponseEntity<List<Inventario>> obtenerInventarioProveedor(@PathVariable int id) {
        // Lógica para obtener datos del inventario del proveedor según el ID
        System.out.println(id);
        LogicaInventario log = new LogicaInventario();
        List<Inventario> inventario = log.obtenerInventarioPorProveedor(id);
        
        for (Inventario item : inventario) {
            System.out.println("dffffffffffffffd");
            // Accede a las propiedades de cada objeto Inventario
            int itemId = item.getId();
            String codigo = item.getCodigo();
            String nombre = item.getNombre();
            String descripcion = item.getDescripcion();
            int cantidad = item.getCantidad();
            String tipo = item.getTipo();
            int activo = item.getActivo();
            
            System.out.println(nombre);
            System.out.println("controller");

            // Realiza operaciones con las propiedades del objeto Inventario
            // ...
        }
        
        
        
        System.out.println("entro inventario");
        return ResponseEntity.ok(inventario);
    }
    
}
