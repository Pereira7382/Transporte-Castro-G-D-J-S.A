/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.domain;

import java.sql.Date;

public class GastoCombustible {

    private int id;
    private String numero_factura;
    private double monto;
    private String matricula;
    private int proveedor;
    private int kilometrajeAnterior;
    private int kilometrajeActual;
    private Date fecha;
    private Double litros;
    private int estado;
    private int id_camion;
    private String nombre;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNumero_factura() {
        return numero_factura;
    }

    public void setNumero_factura(String numero_factura) {
        this.numero_factura = numero_factura;
    }

    public double getMonto() {
        return monto;
    }

    public void setMonto(double monto) {
        this.monto = monto;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public int getProveedor() {
        return proveedor;
    }

    public void setProveedor(int proveedor) {
        this.proveedor = proveedor;
    }

    public int getKilometrajeAnterior() {
        return kilometrajeAnterior;
    }

    public void setKilometrajeAnterior(int kilometrajeAnterior) {
        this.kilometrajeAnterior = kilometrajeAnterior;
    }

    public int getKilometrajeActual() {
        return kilometrajeActual;
    }

    public void setKilometrajeActual(int kilometrajeActual) {
        this.kilometrajeActual = kilometrajeActual;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Double getLitros() {
        return litros;
    }

    public void setLitros(Double litros) {
        this.litros = litros;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    

    public GastoCombustible() {
    }

    public int getId_camion() {
        return id_camion;
    }

    public void setId_camion(int id_camion) {
        this.id_camion = id_camion;
    }

    public GastoCombustible(int id, String numero_factura, double monto, String matricula, int proveedor, int kilometrajeAnterior, int kilometrajeActual, Date fecha, Double litros, int estado, int id_camion) {
        this.id = id;
        this.numero_factura = numero_factura;
        this.monto = monto;
        this.matricula = matricula;
        this.proveedor = proveedor;
        this.kilometrajeAnterior = kilometrajeAnterior;
        this.kilometrajeActual = kilometrajeActual;
        this.fecha = fecha;
        this.litros = litros;
        this.estado = estado;
        this.id_camion = id_camion;
    }

    public GastoCombustible(int id,String numero_factura, double monto, String matricula, int kilometrajeAnterior, int kilometrajeActual, String nombre, Date fecha, Double litros) {
        this.id = id;
        this.numero_factura = numero_factura;
        this.monto = monto;
        this.matricula = matricula;
        this.kilometrajeAnterior = kilometrajeAnterior;
        this.kilometrajeActual = kilometrajeActual;
        this.nombre = nombre;
        this.fecha = fecha;
        this.litros = litros;
    }
    
    
    public String imprimir() {
        return "\n GastoCombustible{"
                + "id=" + id
                + ", numero_factura=" + numero_factura
                + ", monto=" + monto
                + ", matricula='" + matricula + '\''
                + ", proveedor=" + proveedor
                + ", kilometrajeAnterior=" + kilometrajeAnterior
                + ", kilometrajeActual=" + kilometrajeActual
                + ", fecha=" + fecha
                + ", litros=" + litros
                + ", estado=" + estado
                + ", id_camion=" + id_camion
                + '}';
    }

}
