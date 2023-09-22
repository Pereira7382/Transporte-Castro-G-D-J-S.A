import React, { useState } from 'react';
import { toast } from 'react-toastify';


const ModalInventario = ({actualizarTablaInventario}) => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    cantidad: '',
    tipo: 'Herramienta', // Valor predeterminado en 'Herramienta'
    activo: 1, // Valor predeterminado en 1
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Validaciones para campos "cantidad" (aceptar solo números)
    if (name === 'cantidad') {
      if (value !== '' && !/^\d+$/.test(value)) {
        return; // No actualizar el estado si no es un número y no está vacío
      }
    }
  
    // Validar que solo se puedan ingresar letras, números y espacios en los campos 'codigo' y 'descripcion'
    if (name === 'codigo' || name === 'descripcion') {
      const regex = /^[A-Za-z0-9\s]+$/;
  
      if (value !== '' && !regex.test(value)) {
        return; // No actualizar el estado si no cumple con la expresión regular y no está vacío
      }
    }
  
    // Validar que solo se puedan ingresar letras y espacios en los campos 'nombre' y 'tipo'
    if (name === 'nombre' || name === 'tipo') {
      const regex = /^[A-Za-z\s]+$/;
  
      if (value !== '' && !regex.test(value)) {
        return; // No actualizar el estado si no cumple con la expresión regular y no está vacío
      }
    }
  
    setFormData({ ...formData, [name]: value });
  };
  
  

  const handleSubmit = async () => {

    try {

  
     
      // Aquí debes realizar la conexión con el servidor en NetBeans
      // y enviar los datos del formulario para guardar el registro
      const response = await fetch('http://localhost:8080/inventario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {

        // Limpiar el formulario
        setFormData({
          codigo: '',
          nombre: '',
          descripcion: '',
          cantidad: '',
          tipo: 'Herramienta', // Valor predeterminado en 'Herramienta'
          activo: 1, // Valor predeterminado en 1
        });

        // Cerrar el modal
        document.getElementById('modalInventario').classList.remove('show');
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = '0';

        // Mostrar notificación alerta de éxito
          toast.success('Datos ingresados correctamente');

          if (typeof actualizarTablaInventario === "function") {
            actualizarTablaInventario(formData);
          }

          
        // Puedes agregar una función para cerrar el modal aquí
      } else {
        console.error('Error al guardar el registro');
      }
    } catch (error) {
      console.error('Error en la conexión con el servidor:', error);
    }
  };



  return (
    <div>
      {/* Modal */}
      <div className="modal fade" id="modalInventario" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Registrar Inventario</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="codigo" className="form-label">Código</label>
                  <input type="text" className="form-control" id="codigo" name="codigo" value={formData.codigo} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">Descripción</label>
                  <textarea className="form-control" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="cantidad" className="form-label">Cantidad</label>
                  <input type="text" className="form-control" id="cantidad" name="cantidad" value={formData.cantidad} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tipo" className="form-label">Tipo</label>
                  <select className="form-select" id="tipo" name="tipo" value={formData.tipo} onChange={handleChange}>
                    <option value="Herramienta">Herramienta</option>
                    <option value="Inventario">Inventario</option>
                  </select>
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
  );
}

export default ModalInventario;
