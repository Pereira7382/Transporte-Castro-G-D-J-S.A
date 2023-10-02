
package una.ac.cr.sistema_transporte.jpa;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import una.ac.cr.sistema_transporte.domain.Inventario;
import una.ac.cr.sistema_transporte.repository.inventarioRepository;
import una.ac.cr.sistema_transporte.service.inventarioService;


@Service
@Primary
public class inventarioJpa implements inventarioService{

    @Autowired
    private inventarioRepository inventarioRepository;
    
    @Override
    public List<Inventario> listarInventario() {
        return inventarioRepository.findAll();
    }
    
}
