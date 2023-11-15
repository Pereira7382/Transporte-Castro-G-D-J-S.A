import React, { Component } from 'react';
import axios from 'axios';
import Layout from './Layout/Layout';
import TablaRellenos from './TablaRellenos';

class AdminRelleno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rellenos: []
    };
  }
  
  componentDidMount() {
    axios.get("http://localhost:8080/rellenoAceite")
      .then((response) => {
        this.setState({ rellenos: response.data });
      })
      .catch((error) => {
        console.error('Error al obtener datos de rellenos:', error);
      });
  }

  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <TablaRellenos lista={this.state.rellenos}/>
        </div>
      </Layout>
    );
  }
}


export default AdminRelleno;