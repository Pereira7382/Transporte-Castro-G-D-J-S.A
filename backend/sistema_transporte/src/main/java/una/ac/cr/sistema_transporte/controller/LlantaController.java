/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
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
import una.ac.cr.sistema_transporte.Logica.LogicaLlanta;
import una.ac.cr.sistema_transporte.domain.Llanta;

@Controller
@RequestMapping("/llanta")
@CrossOrigin(origins = "*")
public class LlantaController {
    
    LogicaLlanta logica = new LogicaLlanta();
    
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public boolean agregarLlanta(@RequestBody Llanta llanta) {    
        System.out.println(llanta.getProveedor());
        return logica.agregar(llanta);
    }
    
    @GetMapping("/listar")
    @ResponseBody
    public List<Llanta> listar() {
        System.out.println("\n aceites registrados: " + logica.listar().toString());
        return logica.listar();
    }
    
    @GetMapping("/obtenerGastos")
    @ResponseBody
    public List<Llanta> obtenerGastos() {
        return logica.obtenerLlanta();
    }

    
    @DeleteMapping("/{id}")
    @ResponseBody
    public boolean eliminarLlantas(@PathVariable int id) {
        return logica.eliminarLlantas(id);
    }
    
    
   @GetMapping("/{id}/inventario")
    public ResponseEntity<List<Llanta>> obtenerInventarioProveedor(@PathVariable int id) {
        // Lógica para obtener datos del llanta del proveedor según el ID
        System.out.println(id);
        LogicaLlanta log = new LogicaLlanta();
        List<Llanta> Llanta = log.obtenerInventarioPorProveedor(id);
        
        for (Llanta item : Llanta) {
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
        return ResponseEntity.ok(Llanta);
    }
    
    @PutMapping("/{id}")
    @ResponseBody
    public boolean actualizarLlanta(@PathVariable int id, @RequestBody Llanta llanta){
        llanta.setId(id);
        System.out.println(llanta.getProveedor());
        return logica.actualizarLlanta(llanta);
    }
}
