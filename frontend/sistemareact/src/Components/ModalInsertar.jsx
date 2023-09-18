import React, { useState } from 'react';

const ModalInsertar = () => {
  // Estado inicial del formulario, incluyendo el estado por defecto de 1 para "Estado"
  const [formData, setFormData] = useState({
    matricula: '',
    modelo: '',
    estado: 1, // Estado por defecto en 1
    anio: '',
    numero_bin: '',
    kilometraje: '',
    tipo_camion: 'pesado',
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validaciones para campos "Año" y "Kilometraje" (aceptar solo números)
    if ((name === 'anio' || name === 'kilometraje') && !/^\d+$/.test(value)) {
      return; // No actualizar el estado si no es un número
    }

    setFormData({ ...formData, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    try {
      // Aquí debes realizar la conexión con el servidor en NetBeans
      // y enviar los datos del formulario para guardar el registro
      const response = await fetch('http://localhost:8080/camion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Limpiar el formulario
        setFormData({
          matricula: '',
          modelo: '',
          estado: 1, // Estado por defecto en 1
          anio: '',
          numero_bin: '',
          kilometraje: '',
          tipo_camion: 'pesado',
        });

        // Cerrar el modal
        document.getElementById('modalInsertar').classList.remove('show');
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = '0';

        // Puedes agregar una función para cerrar el modal aquí
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
                <h1 className="modal-title fs-5" id="exampleModalLabel">Registrar Camión</h1>
                {/* Botón para cerrar el modal */}
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form>
                  {/* Campos del formulario */}
                  <div className="mb-3">
                    <label htmlFor="matricula" className="form-label">Matrícula</label>
                    <input type="text" className="form-control" id="matricula" name="matricula" value={formData.matricula} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="modelo" className="form-label">Modelo</label>
                    <input type="text" className="form-control" id="modelo" name="modelo" value={formData.modelo} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="anio" className="form-label">Año</label>
                    <input type="text" className="form-control" id="anio" name="anio" value={formData.anio} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="numero_bin" className="form-label">Número BIN</label>
                    <input type="text" className="form-control" id="numero_bin" name="numero_bin" value={formData.numero_bin} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="kilometraje" className="form-label">Kilometraje</label>
                    <input type="text" className="form-control" id="kilometraje" name="kilometraje" value={formData.kilometraje} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tipo_camion" className="form-label">Tipo de Camión</label>
                    <select className="form-select" id="tipo_camion" name="tipo_camion" value={formData.tipo_camion} onChange={handleChange}>
                      <option value="pesado">Pesado</option>
                      <option value="liviano">Liviano</option>
                      <option value="de carga">De Carga</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                {/* Botones para cerrar el modal o guardar cambios */}
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalInsertar;