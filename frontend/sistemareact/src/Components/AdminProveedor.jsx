import React, { Component } from 'react';
import axios from 'axios';
import Layout from './Layout/Layout';
import TablaProveedor from './TablaProveedor';


class AdminProveedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proveedor: []
    };
  }
  
  componentDidMount() {
    axios.get("http://localhost:8080/proveedor")
      .then((response) => {
        this.setState({ proveedor: response.data });
      })
      .catch((error) => {
        console.error('Error al obtener datos de inventario:', error);
      });
  }

  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <TablaProveedor lista={this.state.proveedor}/>
        </div>
      </Layout>
    );
  }
}


export default AdminProveedor;
