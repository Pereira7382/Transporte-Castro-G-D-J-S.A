import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './formulario.css';

function InsertCamion() {

    const [matricula, setMatricula] = useState(""); // Estado para el valor de la matrícula
    const [modelo, setModelo] = useState(""); 
    const [anio, setAnio] = useState(""); 
    const [numeroBin, setNumeroBin] = useState("");
    const [kilometraje, setKilometraje] = useState("");


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


    return (


        <div className="form-container">
            <h3>Registro de Camiones</h3>
            <br></br>
            <form action="">
               
               
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



                <label htmlFor="estado" className="label">Estado:</label>
                <br></br>
                <input type="radio" id="true" name="fav_language" value="TRUE" />
                <label htmlFor="true">True</label>
                <br></br>
                <input type="radio" id="false" name="fav_language" value="False" />
                <label htmlFor="false">False</label>



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
                    value={numeroBin}
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


            <label htmlFor="tipo" className="label">Tipo de Camión:</label>
                <br></br>
                <select id="tipo">
                    <option value="slec">Seleccionar</option>
                    <option value="pesado">Pesado</option>
                    <option value="libeano">Libeano</option>
                </select>
                <br></br> <br></br>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>


    );
}

export default InsertCamion;

