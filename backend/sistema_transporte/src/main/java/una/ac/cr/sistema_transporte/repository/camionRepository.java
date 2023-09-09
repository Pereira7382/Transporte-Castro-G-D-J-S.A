
package una.ac.cr.sistema_transporte.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import una.ac.cr.sistema_transporte.domain.Camion;

public interface camionRepository extends JpaRepository<Camion, Integer>{
    
}
