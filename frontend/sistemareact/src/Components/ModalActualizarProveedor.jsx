import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';


const ModalActualizarProveedor = ({ proveedor, actualizarTablaProveedor }) => {
  const [formData, setFormData] = useState({
    correo_electronico: '',
    telefono: '',    
    contacto: '',
    direccion: '',
    estado: 1, // Estado por defecto en 1
  });

  useEffect(() => {
    if (proveedor) {
      setFormData({ ...proveedor });
    }
  }, [proveedor]);

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

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/proveedor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
            correo_electronico: '',
            telefono: '',    
            contacto: '',
            direccion: '',
            estado: 1, // Estado por defecto en 1
        });

        // Cierra el modal
        document.getElementById("modalActualizarProveedor").classList.remove("show");
        document.body.classList.remove("modal-open");
        document.body.style.paddingRight = "0";

        // Llama a la función para actualizar la tabla
        if (typeof actualizarTablaProveedor === "function") {
          actualizarTablaProveedor(formData);
        }
         // Mostrar notificación alerta de éxito
         toast.success('Datos Actualizados');
        // Puedes agregar una función para cerrar el modal aquí
        
      } else {
        console.error("Error al guardar el registro");
      }
    } catch (error) {
      console.error("Error en la conexión con el servidor:", error);
    }
  };

  return (
    <>
      <div>
      <div className="modal fade" id="modalActualizarProveedor" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Actualizar Proveedor</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form>
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
                    <label htmlFor="direccion" className="form-label">Direccion</label>
                    <input type="text" className="form-control" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} />
                  </div>
                  
                
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Guardar</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalActualizarProveedor;
