import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ModalInsertar = () => {
  // Estado inicial del formulario, incluyendo el estado por defecto de 1 para "Estado"
  const [formData, setFormData] = useState({
    matricula: '',
    modelo: '',
    estado: 1, // Estado por defecto en 1
    anio: '',
    numero_bin: '',
    kilometraje: '',
    capacidad_aceite:'',
    promedio_consumo_gasolina:'',
    promedio_consumo_aceite:'',
    tipo_camion: 'pesado',
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Validaciones para campos "Año" y "Kilometraje" (aceptar solo números)
    if ((name === 'anio'
     || name === 'kilometraje' 
     || name === 'promedio_consumo_gasolina'
     || name === 'promedio_consumo_aceite')
     && !/^\d+$/.test(value)) {
      setFormData({ ...formData, [name]: value });
      return; // No actualizar el estado si no es un número
    }
  
    // Validar que solo se puedan ingresar letras y números en el input de Matrícula y Modelo y numero de bin
    if (name === 'matricula' || name === 'modelo' || name ==='numero_bin') {
      const regex = /^[A-Za-z0-9]+$/;
  
      if (!regex.test(value)) {
        setFormData({ ...formData, [name]: value });
        return; // No actualizar el estado si no cumple con la expresión regular
      }
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
          promedio_consumo_gasolina:'',
          promedio_consumo_aceite:'',
          capacidad_aceite:'',
          tipo_camion: 'pesado',
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
                    <label htmlFor="promedio_consumo_gasolina" className="form-label">Combustible (litros) x km recorrido</label>
                    <input type="text" className="form-control" id="promedio_consumo_gasolina" name="promedio_consumo_gasolina" value={formData.promedio_consumo_gasolina} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="promedio_consumo_aceite" className="form-label">Aceite (litros) x 1000 km recorridos</label>
                    <input type="text" className="form-control" id="promedio_consumo_aceite" name="promedio_consumo_aceite" value={formData.promedio_consumo_aceite} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="capacidad_aceite" className="form-label">Capacidad Aceite</label>
                    <input type="text" className="form-control" id="capacidad_aceite" name="capacidad_aceite" value={formData.capacidad_aceite} onChange={handleChange} />
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

export default ModalInsertar;
