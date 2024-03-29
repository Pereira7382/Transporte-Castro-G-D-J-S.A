package una.ac.cr.sistema_transporte.Logica;

import java.sql.Date;
import java.util.LinkedList;
import una.ac.cr.sistema_transporte.data.DataInventario;
import una.ac.cr.sistema_transporte.data.DataMovimiento;
import una.ac.cr.sistema_transporte.domain.Inventario;
import una.ac.cr.sistema_transporte.domain.MovimientoInventario;

public class LogicaMovimientos {

    DataInventario dataInv = new DataInventario();
    DataMovimiento data = new DataMovimiento();

    public boolean registrarMovimiento(MovimientoInventario movimiento) {
        //primero registrar el movimiento en la tabla de movimientos 
        if (data.registrarMovimiento(movimiento)) {
            return actualizarInventario(movimiento);
        }else{
            System.out.println("no entro!");
            return false;
        }
        
    }

    public boolean actualizarInventario(MovimientoInventario movimiento) {

        //primero extraigo la pieza a la que se le va a mandar la actualizacion
        Inventario pieza = dataInv.obtenerPieza(movimiento.getId_pieza());

        //actualizo la cantidad de piezas dependiendo de la validacion del tipo de movimiento
        if (movimiento.getTipo_movimiento().equals("Entrada")) {
            pieza.setCantidad(pieza.getCantidad() + movimiento.getCantidad());
        } else {
            pieza.setCantidad(pieza.getCantidad() - movimiento.getCantidad());
        }
        //mando a actualizar el inventario
        return dataInv.actualizarPieza(pieza);
    }
    
    public LinkedList<MovimientoInventario> obtenerMovimientosPieza(int id_pieza){
        return data.movimientosPieza(id_pieza);
    }
    
    public LinkedList<MovimientoInventario> obtenerMovimientosPorFecha(Date fechaInicio, Date fechaFin){
        return data.movimientoPorFecha(fechaInicio, fechaFin);
    }

    public LinkedList<MovimientoInventario> obtenerMovimientos(){
        return data.obtenerMovimientos();
    }
    
    public boolean eliminarMovimiento(int id){
        return data.eliminarMovimiento(id);
    }
}
