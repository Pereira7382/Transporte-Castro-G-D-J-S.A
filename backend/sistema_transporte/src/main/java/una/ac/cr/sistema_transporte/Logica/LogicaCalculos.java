package una.ac.cr.sistema_transporte.Logica;

import una.ac.cr.sistema_transporte.domain.GastoAceite;
import una.ac.cr.sistema_transporte.domain.RellenoAceite;

public class LogicaCalculos {

    public int litrosConsumidos(GastoAceite gasto) {
        //sumo la cantidad inicial y recorro la lista de rellenos para ir sumando los litros de relleno

        int cant = gasto.getCamion().getCapacidad_aceite();

        for (RellenoAceite relleno : gasto.getRellenos()) {
            cant += relleno.getCantidad();
        }
        return cant;
    }

    public int kmRecorridos(GastoAceite gasto) {
        return gasto.getCamion().getKilometraje() - gasto.getKm_momento();
    }

    public double costoPorKm(GastoAceite gasto) {
        //para calcular el costo x km primero tengo que calcular el gasto total del mantenimiento 

        double gastoTotal = gastoTotal(gasto);

        //luego el gasto total dividirlo entre todos los km recorridos desde que se registro el mantenimiento
        // hasta el km actual del camion
        int kmRecorridos = kmRecorridos(gasto);

        double costoXkm = 0;

        costoXkm = gastoTotal / kmRecorridos;

        return costoXkm;
    }

    public double gastoTotal(GastoAceite gasto) {
        //gasto total es igual al gasto principal mas todos los gastos de los rellenos
        double gast = gasto.getMonto();

        for (RellenoAceite relleno : gasto.getRellenos()) {
            gast += relleno.getMonto();
        }
        return gast;
    }

    public double ltXkm(GastoAceite gasto) {

        double totalLitros = (double) litrosConsumidos(gasto);
        double kmRecorridos = (double) kmRecorridos(gasto);

        if (kmRecorridos != 0.0) {
            System.out.println("\n total de litos : " + totalLitros
                    + " / kmrecorridos : " + kmRecorridos + " total lix 1000km : " + totalLitros / kmRecorridos * 1000);
            return totalLitros / kmRecorridos * 1000;
        }
        return 0;
    }

    public int kmRestantes(GastoAceite gasto) {
        return gasto.getAceite().getDuracion() - kmRecorridos(gasto);
    }
}
