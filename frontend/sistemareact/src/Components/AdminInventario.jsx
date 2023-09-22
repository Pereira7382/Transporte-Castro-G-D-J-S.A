import React, { Component } from 'react';
import axios from 'axios';
import Layout from './Layout/Layout';
import TablaInventario from './TablaInventario';


class AdminInventario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventario: []
    };
  }
  
  componentDidMount() {
    axios.get("http://localhost:8080/inventario")
      .then((response) => {
        this.setState({ inventario: response.data });
      })
      .catch((error) => {
        console.error('Error al obtener datos de inventario:', error);
      });
  }

  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <TablaInventario lista={this.state.inventario}/>
        </div>
      </Layout>
    );
  }
}


export default AdminInventario;
