
package una.ac.cr.sistema_transporte.domain;

public class Aceite {
    private int id;
    private String marca;
    private String descripcion;
    private int duracion;
    private int proveedor;
    private String contactoProveedor;
    private int estado;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getDuracion() {
        return duracion;
    }

    public void setDuracion(int duracion) {
        this.duracion = duracion;
    }

    public int getProveedor() {
        return proveedor;
    }

    public void setProveedor(int proveedor) {
        this.proveedor = proveedor;
    }

    public String getContactoProveedor() {
        return contactoProveedor;
    }

    public void setContactoProveedor(String contactoProveedor) {
        this.contactoProveedor = contactoProveedor;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }
    
    public Aceite() {
    }

    public Aceite(int id, String marca, String descripcion, int duracion, int proveedor, String contactoProveedor, int estado) {
        this.id = id;
        this.marca = marca;
        this.descripcion = descripcion;
        this.duracion = duracion;
        this.proveedor = proveedor;
        this.contactoProveedor = contactoProveedor;
        this.estado = estado;
    }
    
}
