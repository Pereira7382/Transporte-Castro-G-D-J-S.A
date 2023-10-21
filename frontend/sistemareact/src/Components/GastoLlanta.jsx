import TablaGastoLlanta from './TablaGastoLlanta';
import React, { Component } from 'react';
import axios from 'axios';
import Layout from './Layout/Layout';

class GastoLlanta extends Component {
    constructor(props) {
      super(props);
      this.state = {
        gastosLlanta: []
      };
    }
    
    componentDidMount() {
      axios.get("http://localhost:8080/gastoLlanta")
        .then((response) => {
          this.setState({ gastosLlanta: response.data });
        })
        .catch((error) => {
          console.error('Error al obtener datos de inventario:', error);
        });
    }
  
  
    render() {
      return (
        <Layout>
          <div className="container mt-4">
            <TablaGastoLlanta lista={this.state.gastosLlanta}/>
          </div>
        </Layout>
      );
    }
  }
  
export default GastoLlanta;
