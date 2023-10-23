import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const ModalActualizarGastoA = ({ gasto, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        id: gasto.id,
        numero_factura: gasto.numero_factura,
        monto: gasto.monto,
        matricula: gasto.matricula,
        proveedor: gasto.proveedor,
        marca: gasto.marca,
        kilometrajeActual: gasto.kilometrajeActual,
        duracion: gasto.duracion,
        fecha: gasto.fecha,
    });
    
    const [modalVisible, setModalVisible] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/gastoAceite/${formData.id}`, formData);
            if (response.status === 200) {
                toast.success('Datos actualizados correctamente');
                onUpdate(formData); // Actualiza la tabla después de la actualización
                setModalVisible(false); // Oculta el modal
            } else {
                toast.error('Error al actualizar datos');
            }
        } catch (error) {
            console.error('Error en la conexión con el servidor:', error);
            toast.error('Error al conectar con el servidor');
        }
    };
    return (
        <div className={`modal fade ${modalVisible ? 'show' : ''}`} style={{ display: modalVisible ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Actualizar gasto de aceite</h1>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setModalVisible(false)} />
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="numero_factura" className="form-label">Número de factura</label>
                                <input type="text" className="form-control" id="numero_factura" name="numero_factura" value={formData.numero_factura} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="monto" className="form-label">Monto</label>
                                <input type="number" className="form-control" id="monto" name="monto" value={formData.monto} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="matricula" className="form-label">Matrícula</label>
                                <input type="text" className="form-control" id="matricula" name="matricula" value={formData.matricula} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="proveedor" className="form-label">Proveedor</label>
                                <input type="text" className="form-control" id="proveedor" name="proveedor" value={formData.proveedor} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="marca" className="form-label">Marca</label>
                                <input type="text" className="form-control" id="marca" name="marca" value={formData.marca} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="kilometrajeActual" className="form-label">Kilometraje Actual</label>
                                <input type="number" className="form-control" id="kilometrajeActual" name="kilometrajeActual" value={formData.kilometrajeActual} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="duracion" className="form-label">Duración</label>
                                <input type="text" className="form-control" id="duracion" name="duracion" value={formData.duracion} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fecha" className="form-label">Fecha</label>
                                <input type="date" className="form-control" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setModalVisible(false)}>Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Actualizar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalActualizarGastoA;