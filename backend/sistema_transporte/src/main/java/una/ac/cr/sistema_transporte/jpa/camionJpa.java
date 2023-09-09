
package una.ac.cr.sistema_transporte.jpa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import una.ac.cr.sistema_transporte.domain.Camion;
import una.ac.cr.sistema_transporte.repository.camionRepository;
import una.ac.cr.sistema_transporte.service.camionService;

@Service
@Primary
//public class sociosJpa implements sociosService
public class camionJpa implements camionService{

    @Autowired
    private camionRepository camionRepository;

    @Override
    public void insertarCamion(Camion camion) {
        camionRepository.save(camion);
    }
    
    
}
