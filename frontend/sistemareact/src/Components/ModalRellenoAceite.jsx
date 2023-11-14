import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ModalRellenoAceite = ({ onClose, id_mantenimiento, numero_factura }) => {
    const [formData, setFormData] = useState({
        id_mantenimiento,
        numero_factura,
        cantidad: "",
        monto: "",
        observaciones: "",
    });

    useEffect(() => {
        // Este código se ejecutará cuando id_mantenimiento o numero_factura cambien
        setFormData(prevFormData => ({
            ...prevFormData,
            id_mantenimiento,
            numero_factura,
        }));
    }, [id_mantenimiento, numero_factura]);

    const [showModal] = useState(false);

    const  handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        if (parseInt(formData.cantidad) === 0) {
            toast.error('La cantidad debe ser mayor que 0');
            return;
        } else if (formData.observaciones === "") {
            formData.observaciones = "ninguna observacion ";
        }

        const { id_mantenimiento, cantidad, observaciones, monto } = formData;
        const dataToSend = {
            id_mantenimiento,
            cantidad,
            observaciones,
            monto
        };

        try {
            const response = await fetch('http://localhost:8080/rellenoAceite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                setFormData({
                    id_mantenimiento: '',
                    numero_factura: '',
                    cantidad: '',
                    observaciones: '',
                    monto:'',
                });

                document.getElementById('modalInsertarRelleno').classList.remove('show');
                document.body.classList.remove('modal-open');
                document.body.style.paddingRight = '0';

                toast.success('Datos ingresados correctamente');
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

    const handleModalClose = () => {
        setFormData({
            //id_mantenimiento: '',
            //numero_factura: '',
            cantidad: '',
            observaciones: '',
            monto:'',
        });
    };

    return (
        <div className={`modal fade${showModal ? ' show' : ''}`} id="modalInsertarRelleno" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Relleno de aceite </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleModalClose} />
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <input type="hidden" className="form-control" id="id_mantenimiento" name="id_mantenimiento" value={formData.id_mantenimiento} disabled />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="numero_factura" className="form-label">Numero de factura</label>
                                <input type="text" className="form-control" id="numero_factura" name="numero_factura" value={formData.numero_factura} disabled />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cantidad" className="form-label">Cantidad</label>
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
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleModalClose}>Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalRellenoAceite;
