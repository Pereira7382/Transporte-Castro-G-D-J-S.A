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
    });

    const [movimientosPieza, setMovimientosPieza] = useState(null);

    const exportPDF = () => {
      axios.get(`http://localhost:8080/movimientoinventario?pieza=${pieza}`)
        .then((response) => {
          setMovimientosPieza(response.data);
          generatePDF(response.data);
          
        })
        .catch((error) => {
          console.error('Error al obtener datos:', error);
        });

        


    };

    const generatePDF = (movimientos) => {
        if (!movimientos) {
          // Manejar el caso en que movimientos es null
          console.error('Los movimientos son nulos.');
          return;
        }
      
        const doc = new jsPDF();
      
        // Construye una cadena de texto con la información de los movimientos
        let pdfContent = "Movimientos de la Pieza\n\n";
        movimientos.forEach((movimiento, index) => {
          pdfContent += `${index + 1}. Descripción: ${movimiento.descripcion}\n`;
          pdfContent += `   Tipo de Movimiento: ${movimiento.tipo_movimiento}\n`;
          pdfContent += `   Cantidad: ${movimiento.cantidad}\n\n`;
          // Agrega más información según sea necesario
        });
      
        // Agrega la cadena de texto al PDF
        doc.text(pdfContent, 10, 10);
      
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
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                id_pieza: '',
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
