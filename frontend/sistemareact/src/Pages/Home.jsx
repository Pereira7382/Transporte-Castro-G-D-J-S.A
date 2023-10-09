import React from 'react'
import Layout from '../Components/Layout/Layout'


import Carrusel from '../Components/paginaPrincipal';

const Home = () => {
  return (
    <Layout>
        <br></br>
        <h1 className='text-primary text-center'>Sistema de Transporte </h1>
        <br></br>
        <Carrusel />
    </Layout>
  )
}

export default Home
