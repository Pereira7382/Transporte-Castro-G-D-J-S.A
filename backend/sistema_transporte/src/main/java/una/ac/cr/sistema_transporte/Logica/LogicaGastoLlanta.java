
package una.ac.cr.sistema_transporte.Logica;

import una.ac.cr.sistema_transporte.data.DataGastoLlanta;
import una.ac.cr.sistema_transporte.domain.GastoLlanta;

public class LogicaGastoLlanta {
    DataGastoLlanta data = new DataGastoLlanta();
    public boolean agregar(GastoLlanta gasto){
        return data.agregar(gasto);
    }
}
