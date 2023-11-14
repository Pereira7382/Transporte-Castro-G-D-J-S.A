/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.domain;

import java.sql.Date;

public class GastosAceite {
    
    private int id;
    private String numero_factura;
    private double monto;
    private String matricula;
    private String proveedor;
    private String marca;
    private float kilometrajeActual;
    private int duracion;
    private Date fecha;

    public GastosAceite(int id, String numero_factura, double monto, String matricula, String proveedor, String marca, float kilometrajeActual, int duracion, Date fecha) {
        this.id = id;
        this.numero_factura = numero_factura;
        this.monto = monto;
        this.matricula = matricula;
        this.proveedor = proveedor;
        this.marca = marca;
        this.kilometrajeActual = kilometrajeActual;
        this.duracion = duracion;
        this.fecha = fecha;
    }

    public GastosAceite() {
    }

    
    
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

    public String getProveedor() {
        return proveedor;
    }

    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public float getKilometrajeActual() {
        return kilometrajeActual;
    }

    public void setKilometrajeActual(float kilometrajeActual) {
        this.kilometrajeActual = kilometrajeActual;
    }

    public int getDuracion() {
        return duracion;
    }

    public void setDuracion(int duracion) {
        this.duracion = duracion;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    
    
    
    
    
    
    
}
