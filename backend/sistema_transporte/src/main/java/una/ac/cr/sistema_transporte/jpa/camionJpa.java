package una.ac.cr.sistema_transporte.jpa;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import una.ac.cr.sistema_transporte.domain.Camion;
import una.ac.cr.sistema_transporte.repository.camionRepository;
import una.ac.cr.sistema_transporte.service.camionService;

@Service
@Primary
//public class sociosJpa implements sociosService
public class camionJpa implements camionService {

    @Autowired
    private camionRepository camionRepository;

    @Override
    public void insertarCamion(Camion camion) {
        camionRepository.save(camion);
    }

    @Override
    public List<Camion> listarCamion() {
        return camionRepository.findAll();
    }

    @Override
    public Optional<Camion> obtenerCamionPorId(int id) {
        return camionRepository.findById(id);
    }

    @Override
    public void eliminarCamion(int id) {
        System.out.println("\n llego a eliminar al JPAAA ");
        camionRepository.deleteById(id);
        System.out.println("\n EJECUTO EL DELETE BY ID  ");
    }

}
