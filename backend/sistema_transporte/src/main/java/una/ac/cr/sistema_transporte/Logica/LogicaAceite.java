
package una.ac.cr.sistema_transporte.Logica;

import java.util.LinkedList;
import una.ac.cr.sistema_transporte.data.DataAceite;
import una.ac.cr.sistema_transporte.domain.Aceite;

public class LogicaAceite {
    DataAceite data = new DataAceite();
    public LinkedList<Aceite> listar(){
        return data.listar();
    }
}
