import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const ModalInsertarGastoA = () => {
    const [formData, setFormData] = useState({
        numero_factura: '',
        monto: '',
        matricula: '',
        kilometrajeAnterior: '',
        proveedor: '',
        id_camion: '',
        aceite: '', // Asegurarse de inicializar este valor
        duracion: '', // Asegurarse de inicializar este valor
    });

    const [aceites, setAceites] = useState([]);
    const [camiones, setCamiones] = useState([]);

    useEffect(() => {
        obtenerCamiones();
        obtenerAceites();
    }, []);

    const obtenerAceites = () => {
        axios.get("http://localhost:8080/aceite")
            .then((response) => {
                setAceites(response.data);
                if (response.data.length > 0) {
                    const aceiteSeleccionado = response.data[0];
                    const dur = aceiteSeleccionado.duracion;
                    setFormData(prevData => ({
                        ...prevData,
                        duracion: dur,
                        id_aceite: aceiteSeleccionado.id,
                        proveedor: aceiteSeleccionado.contactoProveedor,
                    }));
                }
            })
            .catch(() => {
                toast.error('Error al obtener datos de aceites');
            });
    };

    const obtenerCamiones = () => {
        axios.get("http://localhost:8080/camion")
            .then((response) => {
                setCamiones(response.data);
                if (response.data.length > 0) {
                    const camionSeleccionado = response.data[0];
                    const kmAnterior = camionSeleccionado.kilometraje;
                    setFormData(prevData => ({
                        ...prevData,
                        matricula: camionSeleccionado.matricula,
                        kilometrajeAnterior: kmAnterior,
                        id_camion: camionSeleccionado.id,
                    }));
                }
            })
            .catch((error) => {
                console.error('Error al obtener datos de camiones:', error);
                toast.error('Error al obtener datos de camiones');
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if ((name === 'monto') && value !== '') {
            if (!/^\d+$/.test(value)) return;
        }

        if (name === 'matricula') {
            const camionSeleccionado = camiones.find((camion) => camion.matricula === value);
            const kmAnterior = camionSeleccionado ? camionSeleccionado.kilometraje : '';

            setFormData(prevData => ({
                ...prevData,
                [name]: value,
                kilometrajeAnterior: kmAnterior,
                id_camion: camionSeleccionado ? camionSeleccionado.id : '',
            }));
        } else if (name === 'aceite') {
            const aceiteSeleccionado = aceites.find(aceite => aceite.id === parseInt(value)); // Asegúrate de que el valor sea un número para la comparación
            const prov = aceiteSeleccionado ? aceiteSeleccionado.contactoProveedor : '';
            const durac = aceiteSeleccionado ? aceiteSeleccionado.duracion : '';
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
                id_aceite: aceiteSeleccionado ? aceiteSeleccionado.id : '',
                proveedor: prov,
                duracion: durac,
            }));
        } 

        else {
            setFormData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        if (parseInt(formData.km_proximo) <= 0) {
            toast.error('La cantidad de kilómetros a recorrer para el próximo mantenimiento de aceite debe ser mayor que 0');
            return;
        } else if (parseInt(formData.monto) <= 0) {
            toast.error('El monto de la factura debe ser mayor que 0');
            return;
        }

        const { id_camion, id_aceite, fecha, monto, numero_factura } = formData;
        const dataToSend = {
            id_camion,
            id_aceite,
            fecha,
            monto,
            numero_factura
        };

        try {
            const response = await fetch('http://localhost:8080/gastoAceite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                setFormData({
                    numero_factura: '',
                    monto: '',
                    matricula: '',
                    kilometrajeAnterior: '', // esto funciona como el kilometraje del momento que se realiza el gasto
                    id_aceite: '',
                    duracion: '',
                    proveedor: '',
                    id_camion: '',
                });

                document.getElementById('modalInsertarGastoA').classList.remove('show');
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


    return (
        <>
            <div>
                <div className="modal fade" id="modalInsertarGastoA" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Registrar gasto de aceite</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="numero_factura" className="form-label">Numero de factura</label>
                                        <input type="text" className="form-control" id="numero_factura" name="numero_factura" value={formData.numero_factura} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="monto" className="form-label">Monto</label>
                                        <input type="text" className="form-control" id="monto" name="monto" value={formData.monto} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="matricula" className="form-label">Placa</label>
                                        <select className="form-control" id="matricula" name="matricula" value={formData.matricula} onChange={handleChange}>
                                            {camiones.map((camion) => (
                                                <option key={camion.id} value={camion.matricula}>
                                                    {camion.matricula}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="kilometrajeAnterior" className="form-label">Kilometros Recorridos Actualmente</label>
                                        <input type="text" className="form-control" id="kilometrajeAnterior" name="kilometrajeAnterior" value={formData.kilometrajeAnterior} onChange={handleChange} disabled />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="aceite" className="form-label">Seleccione tipo de aceite</label>
                                        <select className="form-control" id="aceite" name="aceite" value={formData.aceite} onChange={handleChange}> {/* Cambiado de formData.id_aceite a formData.aceite */}
                                            {aceites.map((aceite) => (
                                                <option key={aceite.id} value={aceite.id}>
                                                    {aceite.marca}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="proveedor" className="form-label">Proveedor</label>
                                        <input type="text" className="form-control" id="proveedor" name="proveedor" value={formData.proveedor} onChange={handleChange} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="duracion" className="form-label">Caducidad</label>
                                        <input type="text" className="form-control" id="duracion" name="duracion" value={formData.duracion} onChange={handleChange} disabled />
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
        </>
    );
}

export default ModalInsertarGastoA;
