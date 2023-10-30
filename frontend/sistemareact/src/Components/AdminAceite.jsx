import React, { Component } from 'react';
import axios from 'axios';
import Layout from './Layout/Layout';

import TablaAceite from './TablaAceite'; // Importación por defecto



class AdminAceite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aceite: []
    };
  }
  
  componentDidMount() {
    axios.get("http://localhost:8080/aceite/obtenerAceite")
      .then((response) => {
        this.setState({ aceite: response.data });
      })
      .catch((error) => {
        console.error('Error al obtener datos de LLANTAS:', error);
      });
  }

  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <TablaAceite lista={this.state.aceite}/>
        </div>
      </Layout>
    );
  }
}


export default AdminAceite;