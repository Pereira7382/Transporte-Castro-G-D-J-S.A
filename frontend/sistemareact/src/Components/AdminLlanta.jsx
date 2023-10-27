import React, { Component } from 'react';
import axios from 'axios';
import Layout from './Layout/Layout';

import TablaLlanta from './TablaLlanta'; // Importación por defecto



class AdminLlanta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      llanta: []
    };
  }
  
  componentDidMount() {
    axios.get("http://localhost:8080/llanta/obtenerGastos")
      .then((response) => {
        this.setState({ llanta: response.data });
      })
      .catch((error) => {
        console.error('Error al obtener datos de LLANTAS:', error);
      });
  }

  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <TablaLlanta lista={this.state.llanta}/>
        </div>
      </Layout>
    );
  }
}


export default AdminLlanta;