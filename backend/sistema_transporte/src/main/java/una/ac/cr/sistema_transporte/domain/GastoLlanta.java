/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.domain;

import java.sql.Date;

public class GastoLlanta {
    private int id;
    private Date fecha;
    private double monto;
    private int estado;
    private int id_camion;
    private int id_llanta;
    private String numero_factura;
    private String matriculaCamion;
    private String nombreProveedor;
    private String marcaLlanta;
    private int kmCamion;
    private int kilometrajeAnterior;
    private int duracion;
    private int kilometraje;
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public double getMonto() {
        return monto;
    }

    public void setMonto(double monto) {
        this.monto = monto;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public int getId_camion() {
        return id_camion;
    }

    public void setId_camion(int id_camion) {
        this.id_camion = id_camion;
    }

    public int getId_llanta() {
        return id_llanta;
    }

    public void setId_llanta(int id_llanta) {
        this.id_llanta = id_llanta;
    }

    public String getNumero_factura() {
        return numero_factura;
    }

    public void setNumero_factura(String numero_factura) {
        this.numero_factura = numero_factura;
    }

    public String getMatriculaCamion() {
        return matriculaCamion;
    }

    public void setMatriculaCamion(String matriculaCamion) {
        this.matriculaCamion = matriculaCamion;
    }

    public String getNombreProveedor() {
        return nombreProveedor;
    }

    public void setNombreProveedor(String nombreProveedor) {
        this.nombreProveedor = nombreProveedor;
    }

    public String getMarcaLlanta() {
        return marcaLlanta;
    }

    public void setMarcaLlanta(String marcaLlanta) {
        this.marcaLlanta = marcaLlanta;
    }

    public int getKmCamion() {
        return kmCamion;
    }

    public void setKmCamion(int kmCamion) {
        this.kmCamion = kmCamion;
    }

    public int getDuracion() {
        return duracion;
    }

    public void setDuracion(int duracion) {
        this.duracion = duracion;
    }

    public int getKilometrajeAnterior() {
        return kilometrajeAnterior;
    }

    public void setKilometrajeAnterior(int kilometrajeAnterior) {
        this.kilometrajeAnterior = kilometrajeAnterior;
    }

    public int getKilometraje() {
        return kilometraje;
    }

    public void setKilometraje(int kilometraje) {
        this.kilometraje = kilometraje;
    }
    
    
    
    public GastoLlanta(int id, Date fecha, double monto, int estado, int id_camion, int id_llanta, String numero_factura) {
        this.id = id;
        this.fecha = fecha;
        this.monto = monto;
        this.estado = estado;
        this.id_camion = id_camion;
        this.id_llanta = id_llanta;
        this.numero_factura = numero_factura;
    }
    
    public GastoLlanta(int id, Date fecha, double monto, int estado, int id_camion, int id_llanta, int kilometrajeAnterior, String numero_factura) {
        this.id = id;
        this.fecha = fecha;
        this.monto = monto;
        this.estado = estado;
        this.id_camion = id_camion;
        this.id_llanta = id_llanta;
        this.kilometrajeAnterior  =kilometrajeAnterior;
       this.numero_factura = numero_factura;
    }

    public GastoLlanta() {
    }
}
