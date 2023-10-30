package una.ac.cr.sistema_transporte.Logica;

import java.util.LinkedList;
import java.util.List;
import una.ac.cr.sistema_transporte.data.DataAceite;
import una.ac.cr.sistema_transporte.domain.Aceite;

public class LogicaAceite {

    DataAceite data = new DataAceite();

    public LinkedList<Aceite> listar() {
        return data.listar();
    }

    public LinkedList<Aceite> obtenerAceite() {
        return data.obtenerAceite();
    }

    public boolean eliminarAceite(int id) {
        return data.eliminarAceite(id);
    }

    public boolean agregar(Aceite aceite) {
        return data.agregarAceite(aceite);
    }

    public List<Aceite> obtenerInventarioPorProveedor(int idProveedor) {
        DataAceite acceso = new DataAceite();
        return acceso.obtenerInventarioPorIdProveedor(idProveedor);
    }

    public boolean actualizarLlanta(Aceite aceite) {
        return data.actualizarAceite(aceite);
    }


    
}
