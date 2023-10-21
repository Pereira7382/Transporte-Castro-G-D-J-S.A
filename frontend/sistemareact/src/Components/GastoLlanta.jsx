import TablaGastoLlanta from './TablaGastoLlanta';
import React, { Component } from 'react';
import Layout from './Layout/Layout';

class GastoLlanta extends Component {
    constructor(props) {
      super(props);
      this.state = {
        gastosLlanta: []
      };
    }
    
    componentDidMount() {
        //obtener todos los datos de consumos de llantas para pintarlos en la tabla aca.
     /* axios.get("http://localhost:8080/proveedor")
        .then((response) => {
          this.setState({ proveedor: response.data });
        })
        .catch((error) => {
          console.error('Error al obtener datos de inventario:', error);
        });*/
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
