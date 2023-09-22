package una.ac.cr.sistema_transporte.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
    
    
}
