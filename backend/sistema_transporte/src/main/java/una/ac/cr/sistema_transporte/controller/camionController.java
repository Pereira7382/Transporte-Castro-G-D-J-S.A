
package una.ac.cr.sistema_transporte.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import una.ac.cr.sistema_transporte.domain.Camion;
import una.ac.cr.sistema_transporte.service.camionService;

@Controller
@RequestMapping("/camion")
@CrossOrigin(origins = "*")
public class camionController {
    @Autowired
    private camionService camionRepository;
    
    @PostMapping ( consumes =  MediaType.APPLICATION_JSON_VALUE , produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Camion guardarCamion(@RequestBody Camion camion) {
        System.out.println("llego a la controller");
        camionRepository.insertarCamion(camion);

        return camion;
    }
    
}
