package una.ac.cr.sistema_transporte.domain;

public class Usuario {

    private String usuario;
    private String clave;
    private String token_recuperacion;
    private int estado;

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getToken_recuperacion() {
        return token_recuperacion;
    }

    public void setToken_recuperacion(String token_recuperacion) {
        this.token_recuperacion = token_recuperacion;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public Usuario() {
        this.token_recuperacion = "";
        this.estado = 0;
    }

    public Usuario(String usuario, String clave) {
        this.usuario = usuario;
        this.clave = clave;
    }

}
