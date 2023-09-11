
package una.ac.cr.sistema_transporte.service;

import java.util.List;
import java.util.Optional;
import una.ac.cr.sistema_transporte.domain.Camion;
//cambios de prueba
public interface camionService {
    public void insertarCamion(Camion camion);
    
     public List<Camion> listarCamion() ;
     
       public Optional<Camion>obtenerCamionPorId( int id);
}


