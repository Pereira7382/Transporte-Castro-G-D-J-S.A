
package una.ac.cr.sistema_transporte.Logica;

import una.ac.cr.sistema_transporte.data.DataGastoCom;
import una.ac.cr.sistema_transporte.domain.GastoCombustible;

public class LogicaGastoComb {
    DataGastoCom data = new DataGastoCom();
    public boolean agregar(GastoCombustible gasto){
        if(data.agregar(gasto)){
            return data.actualizarKilometraje(gasto.getId_camion(), gasto.getKilometrajeActual());
        }
        return false;
    }
}
