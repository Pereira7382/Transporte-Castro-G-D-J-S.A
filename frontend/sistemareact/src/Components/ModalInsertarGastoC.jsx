import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const ModalInsertarGastoC = () => {
  // Estado inicial del formulario, incluyendo el estado por defecto de 1 para "Estado"
  const [formData, setFormData] = useState({
    numero_factura: '',
    monto: '',
    matricula: '', // Estado por defecto en 1
    proveedor: '',
    kilometrajeAnterior: '',
    kilometrajeActual: '',
    litros: '',
    id_camion: '',
  });

  // Estado para almacenar la lista de camiones
  const [camiones, setCamiones] = useState([]);

  // Estado para almacenar la lista de proveedores
  const [proveedores, setProveedores] = useState([]);

  // Use useEffect para cargar los camiones una vez que el componente esté montado
  useEffect(() => {
    obtenerCamiones();
    obtenerProveedores();
  }, []);

  const obtenerCamiones = () => {
    axios.get("http://localhost:8080/camion")
      .then((response) => {
        setCamiones(response.data); // Guardar la lista de camiones en el estado
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos de camiones:', error);
        toast.error('Error al obtener datos de camiones');
      });
  };

  const obtenerProveedores = () => {
    axios.get("http://localhost:8080/proveedor")
      .then((response) => {
        setProveedores(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos de camiones:', error);
        toast.error('Error al obtener datos de camiones');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === 'monto' || name === 'litros') && value !== '') {
      if (!/^\d+$/.test(value)) return;
    }

    if (name === 'matricula') {
      const camionSeleccionado = camiones.find((camion) => camion.matricula === value);
      const kmAnterior = camionSeleccionado ? camionSeleccionado.kilometraje : '';
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        kilometrajeAnterior: kmAnterior,
        id_camion: camionSeleccionado ? camionSeleccionado.id : camiones.length > 0 ? camiones[0].id : '',
      }));
    } else if (name === 'proveedor') {
      const proveedorSeleccionado = proveedores.find((proveedor) => proveedor.id_proveedor === parseInt(value));
      setFormData((prevData) => ({
        ...prevData,
        [name]: proveedorSeleccionado ? proveedorSeleccionado.id_proveedor : '',
        id_proveedor: proveedorSeleccionado ? proveedorSeleccionado.id_proveedor : proveedores.length > 0 ? proveedores[0].id_proveedor : '',
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };



  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    try {
      // Aquí debes realizar la conexión con el servidor en NetBeans
      // y enviar los datos del formulario para guardar el registro
      const response = await fetch('http://localhost:8080/gastoCombustible', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {

        // Limpiar el formulario
        setFormData({
          numero_factura: '',
          monto: '',
          matricula: '', // Estado por defecto en 1
          proveedor: '',
          kilometrajeAnterior: '',
          kilometrajeActual: '',
          litros: '',
        });

        // Cerrar el modal
        document.getElementById('ModalInsertarGastoC').classList.remove('show');
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = '0';

        // Mostrar notificación alerta de éxito
        toast.success('Datos ingresados correctamente');
        // Puedes agregar una función para cerrar el modal aquí
        // Recargar la página después de un breve retraso
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.error('Error al guardar el registro');
      }
    } catch (error) {
      console.error('Error en la conexión con el servidor:', error);
    }
  };

  return (
    <>
      <div>
        {/* Modal */}
        <div className="modal fade" id="modalInsertarGasto" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {/* Título del modal */}
                <h1 className="modal-title fs-5" id="exampleModalLabel">Registrar gasto de combustible</h1>
                {/* Botón para cerrar el modal */}
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="numero_factura" className="form-label">Numero de factura</label>
                    <input type="text" className="form-control" id="numero_factura" name="numero_factura" value={formData.numero_factura} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="monto" className="form-label">Monto</label>
                    <input type="text" className="form-control" id="monto" name="monto" value={formData.monto} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="matricula" className="form-label">Placa</label>
                    <select className="form-control" id="matricula" name="matricula" value={formData.matricula} onChange={handleChange}>
                      {camiones.map((camion) => (
                        <option key={camion.id} value={camion.matricula}>
                          {camion.matricula}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="kilometrajeAnterior" className="form-label">Kilometraje Anterior</label>
                    <input type="text" className="form-control" id="kilometrajeAnterior" name="kilometrajeAnterior" value={formData.kilometrajeAnterior} onChange={handleChange} disabled />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="kilometrajeActual" className="form-label">Kilometraje Actual</label>
                    <input type="text" className="form-control" id="kilometrajeActual" name="kilometrajeActual" value={formData.kilometrajeActual} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="proveedor" className="form-label">Proveedor</label>
                    <select className="form-control" id="proveedor" name="proveedor" value={formData.proveedor} onChange={handleChange}>
                      {proveedores.map((proveedor) => (
                        <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                          {proveedor.contacto}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="litros" className="form-label">Litros</label>
                    <input type="text" className="form-control" id="litros" name="litros" value={formData.litros} onChange={handleChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                {/* Botones para cerrar el modal o guardar cambios */}
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalInsertarGastoC;
