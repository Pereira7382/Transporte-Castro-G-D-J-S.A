package una.ac.cr.sistema_transporte.controller;

import java.util.List;
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
import una.ac.cr.sistema_transporte.Logica.LogicaAceite;
import una.ac.cr.sistema_transporte.domain.Aceite;

@Controller
@RequestMapping("/aceite")
@CrossOrigin(origins = "*")
public class AceiteController {

    LogicaAceite logica = new LogicaAceite();

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public boolean agregarAceite(@RequestBody Aceite aceite) {
        System.out.println(aceite.getProveedor());
        return logica.agregar(aceite);
    }

    @GetMapping("/listar")
    @ResponseBody
    public List<Aceite> listar() {
        System.out.println("\n aceites registrados: " + logica.listar().toString());
        return logica.listar();
    }

    @GetMapping("/obtenerAceite")
    @ResponseBody
    public List<Aceite> obtenerAceite() {
        return logica.obtenerAceite();
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public boolean eliminarAceite(@PathVariable int id) {
        return logica.eliminarAceite(id);
    }

    @PutMapping("/{id}")
    @ResponseBody
    public boolean actualizarAceite(@PathVariable int id, @RequestBody Aceite aceite) {
        aceite.setId(id);
        System.out.println(aceite.getProveedor());
        return logica.actualizarLlanta(aceite);
    }

    @GetMapping("/{id}/inventario")
    public ResponseEntity<List<Aceite>> obtenerInventarioProveedor(@PathVariable int id) {
        // Lógica para obtener datos del llanta del proveedor según el ID
        System.out.println(id);
        LogicaAceite log = new LogicaAceite();
        List<Aceite> Aceite = log.obtenerInventarioPorProveedor(id);

        for (Aceite item : Aceite) {
            System.out.println("dffffffffffffffd");
            // Accede a las propiedades de cada objeto llanta
            int itemId = item.getId();
            String marca = item.getMarca();
            String descripcion = item.getDescripcion();
            int duracion = item.getDuracion();
            int estado = item.getEstado();

            System.out.println(marca);
            System.out.println("controller");

            // Realiza operaciones con las propiedades del objeto llanta
            // ...
        }

        System.out.println("entro llanta");
        return ResponseEntity.ok(Aceite);
    }

}
