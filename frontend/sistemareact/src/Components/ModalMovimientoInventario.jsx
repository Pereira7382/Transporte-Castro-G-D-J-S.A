import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';


const ModalMovimientoInventario = ({ pieza }) => {
    const [formData, setFormData] = useState({
        descripcion: '',
        cantidad: '',
        tipo_movimiento: 'Entrada',
        id_pieza: '',
        fecha_movimiento: obtenerFechaActual(),
    });

    const [movimientosPieza, setMovimientosPieza] = useState(null);

    const exportPDF = () => {
        axios.get(`http://localhost:8080/movimientoinventario?pieza=${pieza}`)
            .then((response) => {
                setMovimientosPieza(response.data);
                // Imprime los datos en la consola
                console.log('Datos obtenidos:', response.data);
                generatePDF(response.data);

            })
            .catch((error) => {
                console.error('Error al obtener datos:', error);
            });

    };

    // Función para obtener la fecha actual en formato 'YYYY-MM-DD'
    function obtenerFechaActual() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Añadir 1 porque enero es 0
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const generatePDF = (movimientos) => {
        if (!movimientos || movimientos.length === 0) {
            console.error('No hay datos para generar el PDF.');
            return;
        }

        const doc = new jsPDF();

        let yOffset = 10; // Posición vertical inicial
        const elementsPerPage = 7; // Cantidad de elementos por página
        let pageNumber = 1;

        for (let i = 0; i < movimientos.length; i++) {
            const movimiento = movimientos[i];

            // Enumera cada movimiento
            let movementNumber = i + 1;
            let pdfContent = `Movimiento ${movementNumber}:\n`;

            pdfContent += `Descripción: ${movimiento.descripcion}\n`;
            pdfContent += `Tipo de Movimiento: ${movimiento.tipo_movimiento}\n`;
            pdfContent += `Cantidad: ${movimiento.cantidad}\n`;
            pdfContent += `Fecha: ${movimiento.fecha_movimiento}\n\n`;

            // Agrega el contenido a la página actual
            doc.text(pdfContent, 10, yOffset);

            yOffset += 40; // Ajusta la posición vertical para el próximo elemento

            // Si hemos llegado al séptimo movimiento o al límite de elementos por página, añade una nueva página
            if ((i + 1) % elementsPerPage === 0) {
                doc.addPage();
                yOffset = 10; // Reinicia la posición vertical en la nueva página
                pageNumber++;
            }
        }

        // Guarda el PDF como un Blob
        const pdfBlob = doc.output('blob');

        // Descarga el Blob como un archivo PDF
        saveAs(pdfBlob, `piezamov_${formData.id_pieza}.pdf`);
    };


    useEffect(() => {
        if (pieza) {
            setFormData((prevData) => ({
                ...prevData,
                id_pieza: pieza,
                fecha_movimiento: obtenerFechaActual(),
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                id_pieza: '',
                fecha_movimiento: obtenerFechaActual(),
            }));
        }
    }, [pieza]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8080/movimientoinventario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({
                    descripcion: '',
                    cantidad: '',
                    tipo_movimiento: 'Entrada',
                    id_pieza: '',
                    fecha_movimiento: obtenerFechaActual(),
                });

                document.getElementById("modalMovimientoInventario").classList.remove("show");
                document.body.classList.remove("modal-open");
                document.body.style.paddingRight = "0";

                toast.success('Movimiento registrado');
            } else {
                console.error("Error al guardar el movimiento");
            }
        } catch (error) {
            console.error("Error en la conexión con el servidor:", error);
        }
    };

    return (
        <>
            <div>
                <div className="modal fade" id="modalMovimientoInventario" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar Movimiento</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="tipoMovimiento" className="form-label">Selecciona tipo de movimiento</label>
                                        <select
                                            className="form-select"
                                            id="tipoMovimiento"
                                            name="tipo_movimiento"
                                            value={formData.tipo_movimiento}
                                            onChange={handleChange} // Add onChange handler
                                        >
                                            <option value="Entrada">Entrada</option>
                                            <option value="Salida">Salida</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="descripcion" className="form-label">Motivo</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="descripcion"
                                            name="descripcion"
                                            value={formData.descripcion}
                                            onChange={handleChange} // Add onChange handler
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cantidad" className="form-label">Cantidad</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cantidad"
                                            name="cantidad"
                                            value={formData.cantidad}
                                            onChange={handleChange} // Add onChange handler
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="fecha_movimiento" className="form-label">Fecha</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="fecha_movimiento"
                                            name="fecha_movimiento"
                                            value={formData.fecha_movimiento}
                                            readOnly // Para hacerlo no editable
                                        />
                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="idPieza" className="form-label"></label>
                                        <input
                                            type="hidden"
                                            className="form-control"
                                            id="idPieza"
                                            name="id_pieza"
                                            value={formData.id_pieza}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={exportPDF}>Ver Movimientos</button>
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

export default ModalMovimientoInventario;
