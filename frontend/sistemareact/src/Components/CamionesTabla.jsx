import React, { Component } from 'react'; // Importamos React y Component desde sus módulos correspondientes.
import axios from 'axios'; // Importamos Axios para realizar solicitudes HTTP.

class CamionesTabla extends Component { // Definimos la clase CamionesTabla que extiende Component de React.
  constructor(props) { // Constructor del componente.
    super(props); // Llamamos al constructor de la clase base con las propiedades (props) recibidas.
    this.state = {
      camiones: [] // Inicializamos el estado del componente con un arreglo vacío para almacenar los datos de camiones.
    };
  }

  componentDidMount() { // Método del ciclo de vida de React que se ejecuta después de que el componente se monta.
    axios.get("http://localhost:8080/camion") // Realizamos una solicitud GET a la URL de la API de camiones.
      .then((response) => { // Manejamos la respuesta exitosa de la solicitud.
        // Actualizamos el estado del componente con los datos de camiones obtenidos de la respuesta.
        this.setState({ camiones: response.data });
      })
      .catch((error) => { // Manejamos cualquier error que ocurra durante la solicitud.
        console.error('Error al obtener datos de camiones:', error);
      });
  }

  render() { // Método para renderizar el componente en el DOM.
    return (
      <div>
        <h2>Camiones Registrados</h2>
        <input
          type="text"
          placeholder="Filtrar por matrícula..."
          // Aquí agregar la lógica para filtrar los camiones
        />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Modelo</th>
              <th>Estado</th>
              <th>Año</th>
              <th>Número BIN</th>
              <th>Kilometraje</th>
              <th>Tipo de Camión</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.camiones.map((camion) => (
              <tr key={camion.id_camion}>
                <td style={{ display: 'none' }}>{camion.id_camion}</td>
                <td>{camion.matricula}</td>
                <td>{camion.modelo}</td>
                <td>{camion.estado === 1 ? 'Activo' : 'Inactivo'}</td>
                <td>{camion.anio}</td>
                <td>{camion.numero_bin}</td>
                <td>{camion.kilometraje}</td>
                <td>{camion.tipo_camion}</td>
                <td>
                  <button className="btn btn-primary">Actualizar</button>
                  <button className="btn btn-danger">Eliminar</button>
                  <button className="btn btn-success">Agregar Mantenimiento</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CamionesTabla; // Exportamos el componente CamionesTabla para su uso en otras partes de la aplicación.
