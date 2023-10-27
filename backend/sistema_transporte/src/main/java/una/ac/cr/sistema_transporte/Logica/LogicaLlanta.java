/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.Logica;

import java.util.LinkedList;
import java.util.List;
import una.ac.cr.sistema_transporte.data.DataLlanta;
import una.ac.cr.sistema_transporte.domain.Llanta;

public class LogicaLlanta {

    DataLlanta data = new DataLlanta();

    public LinkedList<Llanta> listar() {
        return data.listar();
    }

    public LinkedList<Llanta> obtenerLlanta() {
        return data.obtenerLlanta();
    }

    public boolean eliminarLlantas(int id) {
        return data.eliminarLlantas(id);
    }
    
        public boolean agregar(Llanta llanta){
        return data.agregarLlanta(llanta);
    }
        
        public List<Llanta> obtenerInventarioPorProveedor(int idProveedor) {
        DataLlanta acceso = new DataLlanta();
        return acceso.obtenerInventarioPorIdProveedor(idProveedor);
    }
}
