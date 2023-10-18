import React, { Component } from 'react';
import axios from 'axios';
import Layout from './Layout/Layout';
import TablaMovimiento from './TablaMovimiento';


class AdminMovimiento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movimiento: []
    };
  }
  
  componentDidMount() {
    axios.get("http://localhost:8080/movimientoinventario/obtener")
      .then((response) => {
        this.setState({ movimiento: response.data });
      })
      .catch((error) => {
        console.error('Error al obtener datos de inventario:', error);
      });
  }

  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <TablaMovimiento lista={this.state.movimiento}/>
        </div>
      </Layout>
    );
  }
}


export default AdminMovimiento;