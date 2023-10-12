import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

const ModalActualizarInventario = ({ inventarioSeleccionado, actualizarTablaInventario }) => {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    cantidad: "",
    tipo: "Herramienta", // Valor predeterminado en 'Herramienta'
    activo: 1, // Valor predeterminado en 1
  });

  const validateForm = (name, value) => {
    if (name === "cantidad" && !/^\d+$/.test(value)) {
      setFormData({ ...formData, [name]: value });
      return false;
    }
    
    if ((name === "codigo" || name === "descripcion") && !/^[A-Za-z0-9\s]+$/.test(value)) {
      setFormData({ ...formData, [name]: value });
      return false;
    }

    if ((name === "nombre" || name === "tipo") && !/^[A-Za-z\s]+$/.test(value)) {
      setFormData({ ...formData, [name]: value });
      return false;
    }

    return true;
  };

  useEffect(() => {
    // Cuando el inventario seleccionado cambia, actualiza el formulario
    if (inventarioSeleccionado) {
      setFormData({ ...inventarioSeleccionado });
    }
  }, [inventarioSeleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (validateForm(name, value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/inventario/${inventarioSeleccionado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {

        setFormData({
          codigo: "",
          nombre: "",
          descripcion: "",
          cantidad: "",
          tipo: "Herramienta", // Valor predeterminado en 'Herramienta'
          activo: 1, // Valor predeterminado en 1
        });

        toast.success('Datos actualizados correctamente');
        // Recargar la página después de un breve retraso
      setTimeout(() => {
        window.location.reload();
      }, 1000);

        if (typeof actualizarTablaInventario === "function") {
          actualizarTablaInventario(formData);
        }

        document.getElementById("modalActualizarInventario").classList.remove("show");
        document.body.classList.remove("modal-open");
        document.body.style.paddingRight = "0";
      } else {
        toast.error("Error al actualizar el registro");
      }
    } catch (error) {
      toast.error("Error en la conexión con el servidor:", error);
    }
  };

  return (
    <div>
      <div className="modal fade" id="modalActualizarInventario" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Actualizar Inventario</h1>
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
                  <input type="text" className="form-control" id="cantidad" name="cantidad" value={formData.cantidad} onChange={handleChange} readOnly/>
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
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalActualizarInventario;
