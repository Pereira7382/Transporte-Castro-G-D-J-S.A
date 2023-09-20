import React, { useState } from "react";
import './formulario.css';
import axios from 'axios';


function InsertCamion() {

    const [matricula, setMatricula] = useState(""); 
    const [modelo, setModelo] = useState(""); 
    const [estado, setEstado] = useState(1);
    const [anio, setAnio] = useState(""); 
    const [numero_bin, setNumeroBin] = useState("");
    const [kilometraje, setKilometraje] = useState("");
    const [tipo_camion, setTipoCamion] = useState('selec');

    //validad la matricula del carro el campo solo acepta letras y numeros
    const handleMatriculaChange = (event) => {
        const inputValue = event.target.value;
        // Utiliza una expresión regular para permitir solo letras y números
        const regex = /^[a-zA-Z0-9]*$/;

        if (regex.test(inputValue)) {
            // Si la entrada es válida, actualiza el estado
            setMatricula(inputValue);
        }
    };

    //validar el modelo 
    const handleModeloChange = (event) => {
        const inputValue = event.target.value;
        // Utiliza una expresión regular para permitir solo letras y números
        const regex = /^[a-zA-Z0-9]*$/;

        if (regex.test(inputValue)) {
            // Si la entrada es válida, actualiza el estado
            setModelo(inputValue);
        }
    };

    const handleEstadoChange = (event) => {
        // Cuando cambie la selección en el grupo de radio, actualiza el estado con el nuevo valor seleccionado
        setEstado(Number(event.target.value)); // Convierte el valor a un número si es necesario
      };


    const handleAnioChange = (event) => {
        const inputValue = event.target.value;
        // Utiliza una expresión regular para permitir solo números
        const regex = /^[0-9]*$/;

        if (regex.test(inputValue)) {
            // Si la entrada es válida, actualiza el estado
            setAnio(inputValue);
        }
    };

    const handleNumeroBinChange = (event) => {
        const inputValue = event.target.value;
        // Utiliza una expresión regular para permitir solo letras y números
        const regex = /^[a-zA-Z0-9]*$/;

        if (regex.test(inputValue)) {
            // Si la entrada es válida, actualiza el estado
            setNumeroBin(inputValue);
        }
    };

    const handleKilometrajeChange = (event) => {
        const inputValue = event.target.value;
        // Utiliza una expresión regular para permitir solo números
        const regex = /^[0-9]*$/;

        if (regex.test(inputValue)) {
            // Si la entrada es válida, actualiza el estado
            setKilometraje(inputValue);
        }
    };


    const handleTipoCamionChange = (event) => {
        
        setTipoCamion(event.target.value);
      };
    

  //conexion con springboot
       const handleSubmit = async(event) =>{
        event.preventDefault();

        const camionData = {
            matricula,
            modelo,
            estado,
            anio,
            numero_bin,
            kilometraje,
            tipo_camion
          
        };

        try {
            const response = await axios.post("http://localhost:8080/camion", camionData); 
            
            console.log("Camión registrado con éxito:", response.camionData);
            
        } catch (error) {
            console.error("Error al registrar el camión:", error);
        }
    }



    return (


        <div className="form-container">
            <h3>Registro de Camiones</h3>
            <br></br>
            <form onSubmit={handleSubmit}>
               
               
                <div className="form-group">
                    <label htmlFor="matricula" className="label">Matricula:</label>
                    <input
                        type="text"
                        id="matricula"
                        className="input-field"
                        placeholder="Ingrese la matrícula del camión"
                        value={matricula}
                        onChange={handleMatriculaChange}
                    />
                </div>

                <div className="form-group">
                <label htmlFor="modelo" className="label">Modelo:</label>
                <input
                    type="text"
                    id="modelo"
                    className="input-field"
                    placeholder="Ingrese el modelo"
                    value={modelo}
                    onChange={handleModeloChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="estado" className="label">Estado:</label>
                <br></br>
                <input
                    type="radio"
                    id="true"
                    name="fav_language"
                    value={1}
                    checked={estado === 1}
                    onChange={handleEstadoChange}
                />
                <label htmlFor="true">True</label>
                <br></br>
                <input
                    type="radio"
                    id="false"
                    name="fav_language"
                    value={2}
                    checked={estado === 2}
                    onChange={handleEstadoChange}
                />
                <label htmlFor="false">False</label>
               
                </div>

               <div className="form-group">
                <br></br>
                <label htmlFor="anio" className="label">Año:</label>
                <input
                    type="number"
                    id="anio"
                    className="input-field"
                    placeholder="Ingrese el año"
                    value={anio}
                    onInput={handleAnioChange}
                />
            </div>



            <div className="form-group">
                <label htmlFor="numeroBin" className="label">Número de Bin:</label>
                <input
                    type="text"
                    id="numeroBin"
                    className="input-field"
                    placeholder="Ingrese el número de bin"
                    value={numero_bin}
                    onInput={handleNumeroBinChange}
                />
            </div>



             <div className="form-group">
                <label htmlFor="kilometraje" className="label">Kilometraje:</label>
                <input
                    type="number"
                    id="kilometraje"
                    className="input-field"
                    placeholder="Ingrese el Kilometraje"
                    value={kilometraje}
                    onInput={handleKilometrajeChange}
                />
            </div>

            <div className="form-group">
            <label htmlFor="tipo" className="label">Tipo de Camión:</label>
                <br></br>
                <select id="tipo" name="tipoCamion" value={tipo_camion} onChange={handleTipoCamionChange}>
                    <option value="selec">Seleccionar</option>
                    <option value="pesado">Pesado</option>
                    <option value="liveano">Liveano</option>
                </select>

                </div>
                <br></br> <br></br>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>


    );
}

export default InsertCamion;

