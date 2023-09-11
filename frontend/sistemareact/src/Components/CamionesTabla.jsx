import React, { Component } from 'react';
import axios from 'axios';

class CamionesTabla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camiones: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8080/camion")
      .then((response) => {
        this.setState({ camiones: response.data });
      })
      .catch((error) => {
        console.error('Error al obtener datos de camiones:', error);
      });
  }

  render() {
    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4">Camiones Registrados</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filtrar por matrícula..."
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">Filtrar</button>
          </div>
        </div>
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
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
                <td>{camion.matricula}</td>
                <td>{camion.modelo}</td>
                <td>{camion.estado === 1 ? 'Activo' : 'Inactivo'}</td>
                <td>{camion.anio}</td>
                <td>{camion.numero_bin}</td>
                <td>{camion.kilometraje}</td>
                <td>{camion.tipo_camion}</td>
                <td>
                  <button className="btn btn-sm btn-primary mr-2">Actualizar</button>
                  <button className="btn btn-sm btn-danger mr-2">Eliminar</button>
                  <button className="btn btn-sm btn-success">Agregar Mantenimiento</button>
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
