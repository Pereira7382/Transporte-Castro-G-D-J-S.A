import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ModalInventario = ({ actualizarTablaInventario }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    cantidad: '',
    tipo: 'Herramienta',
    provedor: '', // Nuevo campo para almacenar el nombre del proveedor seleccionado
    activo: 1,
  });

  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    // Obtener la lista de proveedores al cargar el componente
    async function fetchProveedores() {
      try {
        const response = await fetch('http://localhost:8080/proveedor/nombres');
        if (response.ok) {
          const data = await response.json();
          setProveedores(data);
        } else {
          console.error('Error al obtener la lista de proveedores');
        }
      } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
      }
    }

    fetchProveedores();
  }, []); // El segundo argumento [] asegura que este efecto solo se ejecute una vez al cargar el componente

  const handleChange = (e) => {
    const { name, value } = e.target;
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
        // Limpiar el formulario y cerrar el modal
        setFormData({
          codigo: '',
          nombre: '',
          descripcion: '',
          cantidad: '',
          tipo: 'Herramienta',
          proveedor: '',
          activo: 1,
        });
        document.getElementById('modalInventario').classList.remove('show');
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = '0';

        // Mostrar notificación de éxito
        toast.success('Datos ingresados correctamente');

        // Actualizar la tabla si la función está definida
        if (typeof actualizarTablaInventario === 'function') {
          actualizarTablaInventario(formData);
        }

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
                <div className="mb-3">
                  <label htmlFor="provedor" className="form-label">Proveedor</label>
                  <select className="form-select" id="provedor" name="provedor" value={formData.proveedorNombre} onChange={handleChange}>
                    <option value="">Selecciona un proveedor</option>
                    {proveedores.map((proveedor) => (
                      <option key={proveedor.nombre} value={proveedor.nombre}>
                        {proveedor.nombre}
                      </option>
                    ))}
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
