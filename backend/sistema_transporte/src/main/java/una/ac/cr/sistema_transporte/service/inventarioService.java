package una.ac.cr.sistema_transporte.service;

import java.util.List;
import una.ac.cr.sistema_transporte.domain.Inventario;

public interface inventarioService {
    
    //public void insertarInventario(Inventario inventario);
    
    public List<Inventario> listarInventario();
    
    public void insertarInventario(Inventario inventario);
    
    
}
