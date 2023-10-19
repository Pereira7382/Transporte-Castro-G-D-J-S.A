import TablaGastoAceite from './TablaGastoAceite';
import React, { Component } from 'react';
import Layout from './Layout/Layout';

class GastoAceite extends Component {
    constructor(props) {
      super(props);
      this.state = {
        gastosAceite: []
      };
    }
    
    componentDidMount() {
        //obtener todos los datos de consumos de aceite para pintarlos en la tabla aca.
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
            <TablaGastoAceite lista={this.state.gastosAceite}/>
          </div>
        </Layout>
      );
    }
  }
  
export default GastoAceite;
