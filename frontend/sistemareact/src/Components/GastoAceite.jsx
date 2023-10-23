import TablaGastoAceite from './TablaGastoAceite';
import React, { Component } from 'react';
import Layout from './Layout/Layout';
import axios from 'axios';

class GastoAceite extends Component {
    constructor(props) {
      super(props);
      this.state = {
        gastoAceite: []
      };
    }
    
    componentDidMount() {
        //obtener todos los datos de consumos de aceite para pintarlos en la tabla aca.
      axios.get("http://localhost:8080/gastosAceite")
        .then((response) => {
          this.setState({ gastoAceite: response.data });
        })
        .catch((error) => {
          console.error('Error al obtener datos de inventario:', error);
        });
    }
  
    render() {
      return (
        <Layout>
          <div className="container mt-4">
            <TablaGastoAceite lista={this.state.gastoAceite}/>
          </div>
        </Layout>
      );
    }
  }
  
export default GastoAceite;
