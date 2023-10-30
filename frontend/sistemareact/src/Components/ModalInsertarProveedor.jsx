import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ModalInsertarProveedor = () => {
  // Estado inicial del formulario, incluyendo el estado por defecto de 1 para "Estado"
  const [formData, setFormData] = useState({
     correo_electronico: '',
     telefono: '',    
     contacto: '',
     direccion: '',
     estado: 1, // Valor predeterminado en 1
    
   
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    

    
// Validar campo de correo electrónico
if (name === 'correo_electronico') {
    const emailRegex = /^[A-Za-z@]+$/;
  
    if (!emailRegex.test(value)) {
        setFormData({ ...formData, [name]: value });
 
      return; // No actualizar el estado si no cumple con la expresión regular de correo electrónico
    }
  }

  // Validar campo de teléfono (solo números)
  if (name === 'telefono') {
    const phoneRegex = /^[0-9]+$/;

    if (!phoneRegex.test(value)) {
        setFormData({ ...formData, [name]: value });
      return; // No actualizar el estado si no cumple con la expresión regular de teléfono
    }
  }

  // Validar campo de contacto (números, letras y espacios)
  if (name === 'contacto') {
    const contactRegex = /^[A-Za-z0-9\s]+$/;

    if (!contactRegex.test(value)) {
        setFormData({ ...formData, [name]: value });
      return; // No actualizar el estado si no cumple con la expresión regular de contacto
    }
  }

  // Validar campo de dirección (números, letras y espacios)
  if (name === 'direccion') {
    const addressRegex = /^[A-Za-z0-9\s]+$/;

    if (!addressRegex.test(value)) {
        setFormData({ ...formData, [name]: value });
      return; // No actualizar el estado si no cumple con la expresión regular de dirección
    }
  }
    setFormData({ ...formData, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    try {
      // Aquí debes realizar la conexión con el servidor en NetBeans
      // y enviar los datos del formulario para guardar el registro
      const response = await fetch('http://localhost:8080/proveedor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {

        // Limpiar el formulario
        setFormData({
            correo_electronico: '',
            telefono: '',    
            contacto: '',
            direccion: '',
            estado: 1, // Valor predeterminado en 1
           
        });

        // Cerrar el modal
        document.getElementById('modalInsertar').classList.remove('show');
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
        <div className="modal fade" id="modalInsertar" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {/* Título del modal */}
                <h1 className="modal-title fs-5" id="exampleModalLabel">Registrar Proveedor</h1>
                {/* Botón para cerrar el modal */}
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form>
                  {/* Campos del formulario */}
                  <div className="mb-3">
                    <label htmlFor="correo_electronico" className="form-label">Correo Electronico</label>
                    <input type="text" className="form-control" id="correo_electronico" name="correo_electronico" value={formData.correo_electronico} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Telefono</label>
                    <input type="text" className="form-control" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contacto" className="form-label">Contacto</label>
                    <input type="text" className="form-control" id="contacto" name="contacto" value={formData.contacto} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    
                    <input type="hidden" className="form-control" id="estado" name="estado" value={formData.estado} onChange={handleChange} />
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

export default ModalInsertarProveedor;
