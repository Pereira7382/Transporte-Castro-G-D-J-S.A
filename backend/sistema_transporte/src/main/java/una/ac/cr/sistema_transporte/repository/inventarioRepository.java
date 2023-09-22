package una.ac.cr.sistema_transporte.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import una.ac.cr.sistema_transporte.domain.Inventario;

public interface inventarioRepository extends JpaRepository<Inventario, Integer>{
    
}
