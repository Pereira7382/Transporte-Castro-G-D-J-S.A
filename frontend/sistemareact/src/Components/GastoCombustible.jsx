import TablaGastoCombustible from './TablaGastoCombustible';
import React, { Component } from 'react';
import Layout from './Layout/Layout';
import axios from 'axios';

class GastoCombustible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gastosCombustible: [] // Inicializa el estado con un array vacío para almacenar los datos.
    };
  }
  
  componentDidMount() {
    // Obtener todos los datos de consumos de combustible para pintarlos en la tabla aquí.
    axios.get("http://localhost:8080/gastoCombustible")
      .then((response) => {
        this.setState({ gastosCombustible: response.data }); // Establece el estado con los datos recibidos del servidor.
      })
      .catch((error) => {
        console.error('Error al obtener datos de gastos de combustible:', error);
      });
  }

  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <TablaGastoCombustible lista={this.state.gastosCombustible} />
        </div>
      </Layout>
    );
  }
}

export default GastoCombustible;
