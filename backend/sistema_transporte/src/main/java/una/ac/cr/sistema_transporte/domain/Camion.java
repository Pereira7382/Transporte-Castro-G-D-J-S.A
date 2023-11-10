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
    private int id;   
    private String matricula;
    private String modelo;
    private int estado;
    private int anio;
    private String numero_bin;
    private int kilometraje;
    private int promedio_consumo_aceite;
    private int promedio_consumo_gasolina;
    private int capacidad_aceite;
    private String tipo_camion;
    
    public Camion() {
    }

    public Camion(int id, String matricula, String modelo, int estado, int anio, String numero_bin, int kilometraje, int promedio_consumo_aceite, int promedio_consumo_gasolina, int capacidad_aceite, String tipo_camion) {
        this.id = id;
        this.matricula = matricula;
        this.modelo = modelo;
        this.estado = estado;
        this.anio = anio;
        this.numero_bin = numero_bin;
        this.kilometraje = kilometraje;
        this.promedio_consumo_aceite = promedio_consumo_aceite;
        this.promedio_consumo_gasolina = promedio_consumo_gasolina;
        this.capacidad_aceite = capacidad_aceite;
        this.tipo_camion = tipo_camion;
    }

    public int getCapacidad_aceite() {
        return capacidad_aceite;
    }

    public void setCapacidad_aceite(int capacidad_aceite) {
        this.capacidad_aceite = capacidad_aceite;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public int getPromedio_consumo_aceite() {
        return promedio_consumo_aceite;
    }

    public void setPromedio_consumo_aceite(int promedio_consumo_aceite) {
        this.promedio_consumo_aceite = promedio_consumo_aceite;
    }

    public int getPromedio_consumo_gasolina() {
        return promedio_consumo_gasolina;
    }

    public void setPromedio_consumo_gasolina(int promedio_consumo_gasolina) {
        this.promedio_consumo_gasolina = promedio_consumo_gasolina;
    }
    
    
}
