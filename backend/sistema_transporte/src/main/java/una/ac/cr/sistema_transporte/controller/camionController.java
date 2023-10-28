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
import una.ac.cr.sistema_transporte.domain.Camion;
import una.ac.cr.sistema_transporte.service.camionService;

@Controller
@RequestMapping("/camion")
@CrossOrigin(origins = "*")
public class camionController {

    @Autowired
    private camionService camionRepository;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Camion guardarCamion(@RequestBody Camion camion) {
        System.out.println("llego a la controller");
        camionRepository.insertarCamion(camion);
        return camion;
    }

    @GetMapping
    @ResponseBody
    public List<Camion> mostrarRegistrosCamiones() {
        List<Camion> camion = camionRepository.listarCamion();
        return camion;
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Optional<Camion> obtenerCamionPorId(@PathVariable int id) {
        System.out.println("id recibido : "+ id);
        Optional<Camion> optionalCamion = camionRepository.obtenerCamionPorId(id);
        return optionalCamion;

    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public void eliminarCamion(@PathVariable int id) {
        System.out.println("\n llego a eliminar a la controlleeeeeeer ");
        camionRepository.eliminarCamion(id);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> actualizarCamion(@PathVariable int id, @RequestBody Camion camionActualizado) {
        Optional<Camion> optionalCamion = camionRepository.obtenerCamionPorId(id);

        if (optionalCamion.isPresent()) {
            Camion camionExistente = optionalCamion.get();

            // Actualizar los campos del camionExistente con los datos de camionActualizado
            camionExistente.setMatricula(camionActualizado.getMatricula());
            camionExistente.setModelo(camionActualizado.getModelo());
            camionExistente.setEstado(camionActualizado.getEstado());
            camionExistente.setAnio(camionActualizado.getAnio());
            camionExistente.setNumero_bin(camionActualizado.getNumero_bin());
            camionExistente.setKilometraje(camionActualizado.getKilometraje());
            camionExistente.setTipo_camion(camionActualizado.getTipo_camion());

            camionRepository.actualizarCamion(camionExistente);

            return ResponseEntity.ok("Camión actualizado correctamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
