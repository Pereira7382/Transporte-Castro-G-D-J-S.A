import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const ModalInsertarGastoC = () => {
  const [formData, setFormData] = useState({
    numero_factura: '',
    monto: '',
    matricula: '',
    proveedor: '',
    kilometrajeActual: '',
    id_camion: '',
    km_proximo: '',
    
  });

  const [camiones, setCamiones] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    obtenerCamiones();
    obtenerProveedores();
  }, []);

  const obtenerCamiones = () => {
    axios.get("http://localhost:8080/camion")
      .then((response) => {
        setCamiones(response.data);
        if (response.data.length > 0) {
          const camionSeleccionado = response.data[0];
          const kmAnterior = camionSeleccionado.kilometraje;
          setFormData(prevData => ({
            ...prevData,
            matricula: camionSeleccionado.matricula,
            kilometrajeAnterior: kmAnterior,
            id_camion: camionSeleccionado.id,
          }));
        }
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
        if (response.data.length > 0) {
          const proveedorSeleccionado = response.data[0];
          setFormData(prevData => ({
            ...prevData,
            proveedor: proveedorSeleccionado.id_proveedor,
          }));
        }
      })
      .catch((error) => {
        console.error('Error al obtener datos de proveedores:', error);
        toast.error('Error al obtener datos de proveedores');
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
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
        kilometrajeAnterior: kmAnterior,
        id_camion: camionSeleccionado ? camionSeleccionado.id : '',
      }));
    } else if (name === 'proveedor') {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (parseInt(formData.kilometrajeActual) <= parseInt(formData.kilometrajeAnterior)) {
      toast.error('El kilometraje actual debe ser mayor que el anterior');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/gastoCombustible', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          numero_factura: '',
          monto: '',
          matricula: '',
          proveedor: '',
          kilometrajeAnterior: '',
          kilometrajeActual: '',
          litros: '',
        });

        document.getElementById('modalInsertarGasto').classList.remove('show');
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = '0';

        toast.success('Datos ingresados correctamente');
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
        <div className="modal fade" id="modalInsertarGasto" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Registrar gasto de combustible</h1>
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
