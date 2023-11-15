import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';


const ModalActualizarRelleno = ({ relleno, actualizarTablaRellenos }) => {
    const [formData, setFormData] = useState({
        fecha: "",
        km_momento: "",
        cantidad: "",
        monto: "",
        observaciones: "",
    });

    useEffect(() => {
        if (relleno) {
            setFormData({ ...relleno });
        }
    }, [relleno]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if ((name === "cantidad" || name === "monto") && !/^\d+$/.test(value)) {
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/rellenoAceite/${relleno.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });


            if (response.ok) {
                setFormData({
                    cantidad: "",
                    monto: "",
                    observaciones: "",
                });

                // Cierra el modal
                document.getElementById("modalActualizarRelleno").classList.remove("show");
                document.body.classList.remove("modal-open");
                document.body.style.paddingRight = "0";

                // Llama a la función para actualizar la tabla
                if (typeof actualizarTablaRellenos === "function") {
                    actualizarTablaRellenos(formData);
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
                <div className="modal fade" id="modalActualizarRelleno" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Actualizar Relleno</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="fecha" className="form-label">Fecha</label>
                                        <input type="text" className="form-control" id="fecha" name="fecha" value={formData.fecha} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="km_momento" className="form-label">Km al momento</label>
                                        <input type="text" className="form-control" id="km_momento" name="km_momento" value={formData.km_momento} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cantidad" className="form-label">Cantidad en lts</label>
                                        <input type="text" className="form-control" id="cantidad" name="cantidad" value={formData.cantidad} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="monto" className="form-label">Monto</label>
                                        <input type="text" className="form-control" id="monto" name="monto" value={formData.monto} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="observaciones" className="form-label">Observaciones</label>
                                        <input type="text" className="form-control" id="observaciones" name="observaciones" value={formData.observaciones} onChange={handleChange} />
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

export default ModalActualizarRelleno;
