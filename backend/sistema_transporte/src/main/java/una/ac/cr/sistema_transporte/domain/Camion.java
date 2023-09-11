package una.ac.cr.sistema_transporte.domain;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_camion")
public class Camion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_camion;   
    private String matricula;
    private String modelo;
    private int estado;
    private int anio;
    private String numero_bin;
    private int kilometraje;
    private String tipo_camion;
    
    public Camion() {
    }

    public Camion(int id_camion, String matricula, int anio, String modelo, int estado, String tipo_camion, String numero_bin, int kilometraje) {
        this.id_camion = id_camion;
        this.matricula = matricula;
        this.anio = anio;
        this.modelo = modelo;
        this.estado = estado;
        this.tipo_camion = tipo_camion;
        this.numero_bin = numero_bin;
        this.kilometraje = kilometraje;
    }
    
    public int getId_camion() {
        return id_camion;
    }

    public void setId_camion(int id_camion) {
        this.id_camion = id_camion;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public int getAnio() {
        return anio;
    }

    public void setAnio(int anio) {
        this.anio = anio;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public String getTipo_camion() {
        return tipo_camion;
    }

    public void setTipo_camion(String tipo_camion) {
        this.tipo_camion = tipo_camion;
    }

    public String getNumero_bin() {
        return numero_bin;
    }

    public void setNumero_bin(String numero_bin) {
        this.numero_bin = numero_bin;
    }

    public int getKilometraje() {
        return kilometraje;
    }

    public void setKilometraje(int kilometraje) {
        this.kilometraje = kilometraje;
    }
}
