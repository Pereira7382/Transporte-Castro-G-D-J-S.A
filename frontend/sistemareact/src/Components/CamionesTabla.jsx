import React, { Component } from 'react';
import axios from 'axios';
import Layout from './Layout/Layout';
import TablaCamiones from './TablaCamiones';


class CamionesTabla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camiones: []
    };
  }
  
  componentDidMount() {
    axios.get("http://localhost:8080/camion")
      .then((response) => {
        this.setState({ camiones: response.data });
      })
      .catch((error) => {
        console.error('Error al obtener datos de camiones:', error);
      });
  }

  render() {
    return (
      
      <Layout>
        <div className="container mt-4">
          <TablaCamiones lista={this.state.camiones}/>
        </div>
      </Layout>
    );
  }
}


export default CamionesTabla;
