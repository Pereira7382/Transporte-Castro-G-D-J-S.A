import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';

const ModalInsertarAceite = () => {
   
    const [formData, setFormData] = useState({
        marca: '',
        descripcion: '',
        duracion: '',
        proveedor: '',
        estado: 1,


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
    }, []);

    // Función para manejar cambios en los campos del formulario
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


    // Función para manejar el envío del formulario
    const handleSubmit = async () => {
        try {
            // Aquí debes realizar la conexión con el servidor en NetBeans
            // y enviar los datos del formulario para guardar el registro
            const response = await fetch('http://localhost:8080/aceite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {

                // Limpiar el formulario
                setFormData({
                    marca: '',
                    descripcion: '',
                    duracion: '',
                    proveedor: '',
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
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Registrar Aceite</h1>
                                {/* Botón para cerrar el modal */}
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
                                        <label htmlFor="provedor" className="form-label">Proveedor</label>
                                        <select className="form-select" id="proveedor" name="proveedor" value={formData.proveedor}  onChange={handleChange}>
                                            <option value="">Selecciona un proveedor</option>
                                            {proveedores.map((proveedor) => (
                                                <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                                                    {proveedor.contacto}
                                                </option>
                                            ))}
                                        </select>
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

export default ModalInsertarAceite;
 