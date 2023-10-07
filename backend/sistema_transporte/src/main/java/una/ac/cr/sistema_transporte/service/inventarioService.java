package una.ac.cr.sistema_transporte.service;

import java.util.List;
import java.util.Optional;
import una.ac.cr.sistema_transporte.domain.Inventario;

public interface inventarioService {
    
    //public void insertarInventario(Inventario inventario);
    
    public List<Inventario> listarInventario();
    
    public void insertarInventario(Inventario inventario);

    public Optional<Inventario> obtenerInventarioPorId(int id);
 
    public void actualizarInventario(Inventario inventario);
    
    public void eliminarInventario(int id);
    
}
