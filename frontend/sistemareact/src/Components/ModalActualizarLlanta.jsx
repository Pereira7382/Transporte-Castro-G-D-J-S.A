import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';


const ModalActualizarLlanta = ({ llanta }) => {
  const [formData, setFormData] = useState({
    marca: '',
    descripcion: '',
    duracion: '',
    proveedor: '',
    estado: 1,


});
  
  useEffect(() => {
    if (llanta) {
      setFormData({ ...llanta });
    }
  }, [llanta]);

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
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;



      // Validar campo de marca y descripcion
      if (name === 'marca' || name === 'descripcion' || name === 'duracion') {
          const textRegex = /^[A-Za-z0-9\s]+$/;

          if (!textRegex.test(value)) {
              setFormData({ ...formData, [name]: value });
              return; // No actualizar el estado si no cumple con la expresión regular
          }
      }


      setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/llanta/${llanta.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setFormData({
          marca: "",
          descripcion: "",
          duracion: "",
          proveedor: "",
          estado: 1, // Valor predeterminado en 1
        });
  
        // Cierra el modal
        document.getElementById("modalActualizarLlanta").classList.remove("show");
        document.body.classList.remove("modal-open");
        document.body.style.paddingRight = "0";
  
        // Mostrar notificación alerta de éxito
        toast.success("Datos Actualizados");
  
        // Agregar un retraso antes de recargar la página
        setTimeout(() => {
          // Recargar la página
          window.location.reload();
        }, 3000);
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
        <div className="modal fade" id="modalActualizarLlanta" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Actualizar Llanta</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form>
                  {/* Campos del formulario */}
                  <div className="mb-3">
                    <label htmlFor="marca" className="form-label">Marca</label>
                    <input type="text" className="form-control" id="marca" name="marca" value={formData.marca} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripcion</label>
                    <input type="text" className="form-control" id="descripcion " name="descripcion" value={formData.descripcion} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="duracion" className="form-label">Duracion</label>
                    <input type="text" className="form-control" id="duracion" name="duracion" value={formData.duracion} onChange={handleChange} />
                  </div>

                  <div className="mb-3">

                    <input type="hidden" className="form-control" id="estado" name="estado" value={formData.estado} onChange={handleChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="proveedor" className="form-label">Proveedor</label>
                    <select className="form-select" id="proveedor" name="proveedor" value={formData.proveedor} onChange={handleChange}>
                      <option value="">Selecciona un proveedor</option>
                      {proveedores.map((proveedor) => (
                        <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                          {proveedor.contacto}
                        </option>
                      ))}
                      </select>
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

export default ModalActualizarLlanta;
