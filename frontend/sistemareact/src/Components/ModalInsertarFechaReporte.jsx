import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import axios from 'axios';

const ModalInsertarFechaReporte = () => {

    const [form, setForm] = useState({
        fechaInicio: '',
        fechaFinal: '',
    })

  const [formData, setFormData] = useState({
    id: '',
    id_pieza: '',
    descripcion: '',
    tipo_movimiento: '',
    cantidad: '',
    fecha_movimiento: '',
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const exportPDF = () => {
    const { fechaInicio, fechaFinal } = form;
  
    axios.post(`http://localhost:8080/movimientoinventario/reporte-fecha/${fechaInicio}/${fechaFinal}`)
      .then((response) => {
        console.log('Datos obtenidos:', response.data);
        generatePDF(response.data);
        setFormData(response.data);
        
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error);
      });
  };
  
  



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

  return (
    <div>
      <div className="modal fade" id="modalInsertar" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Reporte de Fechas</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="fechaInicio" className="form-label">Fecha Inicio</label>
                  <input type="date" className="form-control" id="fechaInicio" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="fechaFinal" className="form-label">Fecha Final</label>
                  <input type="date" className="form-control" id="fechaFinal" name="fechaFinal" value={form.fechaFinal} onChange={handleChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={exportPDF}
              >
                Reporte por Fecha
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInsertarFechaReporte;
