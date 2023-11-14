import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../Asset/Css/fondo.css'; // Archivo de estilos CSS para el fondo gris

const ComboBox = () => {
  const opciones = ['Primer mes', 'Segundo mes', 'Tercer mes', 'Cuarto mes', 'Quinto mes'];
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [opcionesEspecificas, setOpcionesEspecificas] = useState([]);

  const handleSeleccion = (event) => {
    const seleccion = event.target.value;
    setOpcionSeleccionada(seleccion);

    // Aquí puedes definir las opciones específicas para cada selección
    switch (seleccion) {
      case 'Primer mes':
        setOpcionesEspecificas([
          { tipo: 'Litros consumidos', valor: '100', icono: 'fas fa-gas-pump', dato1: 'Dato1', dato2: 'Dato2', dato3: 'Dato3', dato4: 'Dato4', dato5: 'Dato5' },
          { tipo: 'Kilometros Recorridos', valor: '500', icono: 'fas fa-road', dato1: 'Dato1', dato2: 'Dato2', dato3: 'Dato3', dato4: 'Dato4', dato5: 'Dato5' },
          { tipo: 'Litros por kilometro', valor: '0.2', icono: 'fas fa-tachometer-alt', dato1: 'Dato1', dato2: 'Dato2', dato3: 'Dato3', dato4: 'Dato4', dato5: 'Dato5' },
        ]);
        break;
      case 'Segundo mes':
        setOpcionesEspecificas([
          { tipo: 'Litros consumidos', valor: '120', icono: 'fas fa-gas-pump', dato1: 'Dato1', dato2: 'Dato2', dato3: 'Dato3', dato4: 'Dato4', dato5: 'Dato5' },
          { tipo: 'Kilometros Recorridos', valor: '600', icono: 'fas fa-road', dato1: 'Dato1', dato2: 'Dato2', dato3: 'Dato3', dato4: 'Dato4', dato5: 'Dato5' },
          { tipo: 'Litros por kilometro', valor: '0.2', icono: 'fas fa-tachometer-alt', dato1: 'Dato1', dato2: 'Dato2', dato3: 'Dato3', dato4: 'Dato4', dato5: 'Dato5' },
        ]);
        break;
      case 'Tercer mes':
        setOpcionesEspecificas([
          { tipo: 'Litros consumidos', valor: '80', icono: 'fas fa-gas-pump', dato1: 'Dato1', dato2: 'Dato2', dato3: 'Dato3', dato4: 'Dato4', dato5: 'Dato5' },
          { tipo: 'Kilometros Recorridos', valor: '400', icono: 'fas fa-road', dato1: 'Dato1', dato2: 'Dato2', dato3: 'Dato3', dato4: 'Dato4', dato5: 'Dato5' },
          { tipo: 'Litros por kilometro', valor: '0.2', icono: 'fas fa-tachometer-alt', dato1: 'Dato1', dato2: 'Dato2', dato3: 'Dato3', dato4: 'Dato4', dato5: 'Dato5' },
        ]);
        break;
      case 'Cuarto mes':
        setOpcionesEspecificas([
          { tipo: 'Litros consumidos', valor: '90', icono: 'fas fa-gas-pump', dato1: 'Dato1', dato2: 'Dato2', dato3: 'Dato3', dato4: 'Dato4', dato5: 'Dato5' },
          { tipo: 'Kilometros Recorridos', valor: '450', icono: 'fas fa-road', dato1: 'Dato1', dato2: 'Dato2', dato3: 'Dato3', dato4: 'Dato4', dato5: 'Dato5' },
          { tipo: 'Litros por kilometro', valor: '0.2', icono: 'fas fa-tachometer-alt', dato1: 'Dato1', dato2: 'Dato2', dato3: 'Dato3', dato4: 'Dato4', dato5: 'Dato5' },
        ]);
        break;
      case 'Quinto mes':
        setOpcionesEspecificas([
          { tipo: 'Litros consumidos', valor: '110', icono: 'fas fa-gas-pump', dato1: 'Dato1', dato2: 'Dato2', dato3: 'Dato3', dato4: 'Dato4', dato5: 'Dato5' },
          { tipo: 'Kilometros Recorridos', valor: '550', icono: 'fas fa-road', dato1: 'Dato1', dato2: 'Dato2', dato3: 'Dato3', dato4: 'Dato4', dato5: 'Dato5' },
          { tipo: 'Litros por kilometro', valor: '0.2', icono: 'fas fa-tachometer-alt', dato1: 'Dato1', dato2: 'Dato2', dato3: 'Dato3', dato4: 'Dato4', dato5: 'Dato5' },
        ]);
        break;
      default:
        setOpcionesEspecificas([]);
    }
  };

  return (
    <div className="page-container">
      <h1 style={{ color: '#4CAF50', fontFamily: 'Arial, sans-serif', fontSize: '2em', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '20px' }}>Análisis de rodaje de llanta</h1>
      <label htmlFor="opciones" style={{ marginRight: '10px', fontSize: '1.2em', fontWeight: 'bold', color: '#4CAF50' }}>Mes que desea filtrar: </label>
      <select
        id="opciones"
        onChange={handleSeleccion}
        value={opcionSeleccionada}
        style={{ padding: '5px', fontSize: '1em', marginLeft: '10px', borderRadius: '5px', width: '210px' }}
      >
        <option value="" disabled>Selecciona una opción </option>
        {opciones.map((opcion, index) => (
          <option key={index} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
      {opcionSeleccionada && <p style={{ color: '#4CAF50', marginTop: '90px', fontSize: '1.2em', fontWeight: 'bold' }}>Análisis de rodaje de llanta del {opcionSeleccionada}</p>}

      {opcionesEspecificas.length > 0 && (
        <div>
          <p style={{ marginTop: '10px' }}></p>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {opcionesEspecificas.map((opcion, index) => (
              <div key={index} style={{
                border: '1px solid #ccc',
                padding: '3px',
                margin: '20px',
                flex: 1,
                backgroundColor: getColorForOption(opcion.tipo),
                borderRadius: '1px',
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8em' }}>
                  <tbody>
                    <tr>
                      <td style={{ borderBottom: '1px solid #ccc', padding: '4px', textAlign: 'center', fontSize: '1em', fontWeight: 'bold', color: '#4CAF50' }}>
                        <i className={opcion.icono} style={{ marginRight: '5px', color: '#4CAF50' }}></i> {opcion.tipo}
                      </td>
                    </tr>
                    <tr style={{ background: '#f2f2f2' }}>
                      <td style={{ borderBottom: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>
                        <i className="fas fa-gas-pump" style={{ marginRight: '5px', color: '#4CAF50' }}></i> {opcion.valor}
                      </td>
                    </tr>
                    <tr style={{ background: '#f2f2f2' }}>
                      <td style={{ borderBottom: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>
                        <i className="fas fa-info-circle" style={{ marginRight: '5px', color: '#4CAF50' }}></i> {opcion.dato1}
                      </td>
                    </tr>
                    <tr style={{ background: '#f2f2f2' }}>
                      <td style={{ borderBottom: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>
                        <i className="fas fa-road" style={{ marginRight: '5px', color: '#4CAF50' }}></i> {opcion.dato2}
                      </td>
                    </tr>
                    <tr style={{ background: '#f2f2f2' }}>
                      <td style={{ borderBottom: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>
                        <i className="fas fa-tachometer-alt" style={{ marginRight: '5px', color: '#4CAF50' }}></i> {opcion.dato3}
                      </td>
                    </tr>
                    <tr style={{ background: '#f2f2f2' }}>
                      <td style={{ borderBottom: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>
                        <i className="fas fa-gas-pump" style={{ marginRight: '5px', color: '#4CAF50' }}></i> {opcion.dato4}
                      </td>
                    </tr>
                    <tr style={{ background: '#f2f2f2' }}>
                      <td style={{ borderBottom: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>
                        <i className="fas fa-gas-pump" style={{ marginRight: '5px', color: '#4CAF50' }}></i> {opcion.dato5}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const getColorForOption = (opcion) => {
  switch (opcion) {
    case 'Litros consumidos':
      return 'lightgreen'; // Amarillo
    case 'Kilometros Recorridos':
      return 'lightgreen'; // Azul
    case 'Litros por kilometro':
      return 'lightgreen'; // Verde
    default:
      return '#ccc'; // Color por defecto
  }
};

export default ComboBox;
