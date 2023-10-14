import TablaGastoCombustible from './TablaGastoCombustible';
import React, { Component } from 'react';
import Layout from './Layout/Layout';

class GastoCombustible extends Component {
    constructor(props) {
      super(props);
      this.state = {
        gastosCombustible: []
      };
    }
    
    componentDidMount() {
        //obtener todos los datos de consumos de combustible para pintarlos en la tabla aca.
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
            <TablaGastoCombustible lista={this.state.gastosCombustible}/>
          </div>
        </Layout>
      );
    }
  }
  
export default GastoCombustible;
