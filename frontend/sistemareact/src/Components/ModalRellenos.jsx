import React from 'react';
import { Modal, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const ModalRellenos = ({ listaRellenos, handleClose, open }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      {listaRellenos && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '80%', 
          backgroundColor: 'white', 
          boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.15)', 
          p: 4,
          borderRadius: '12px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Lista de Rellenos</h2>
            <IconButton onClick={handleClose} style={{ padding: '8px' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cantidad en litros</TableCell>
                  <TableCell>Observaciones</TableCell>
                  <TableCell>Km Momento</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Monto</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listaRellenos.map(relleno => (
                  <TableRow key={relleno.id}>
                    <TableCell>{relleno.cantidad}</TableCell>
                    <TableCell>{relleno.observaciones}</TableCell>
                    <TableCell>{relleno.km_momento}</TableCell>
                    <TableCell>{relleno.fecha}</TableCell>
                    <TableCell>{relleno.monto}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </Modal>
  );
};

export default ModalRellenos;
