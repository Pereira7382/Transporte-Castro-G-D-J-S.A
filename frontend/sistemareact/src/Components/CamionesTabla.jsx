import React, { Component } from 'react';

class CamionesTabla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camiones: [] // Aquí almacenarás los datos de los camiones obtenidos de la API
    };
  }

  componentDidMount() {
    // Aquí puedes realizar la llamada a la API para obtener los datos de los camiones
    // Luego, actualiza el estado camiones con los datos obtenidos
  }

  render() {
    return (
      <div>
        <h2>Camiones Registrados</h2>
        <input
          type="text"
          placeholder="Filtrar por matrícula..."
          // Aquí puedes agregar la lógica para filtrar los camiones
        />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
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
                <td>{camion.id_camion}</td>
                <td>{camion.matricula}</td>
                <td>{camion.modelo}</td>
                <td>{camion.estado}</td>
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

export default CamionesTabla;
