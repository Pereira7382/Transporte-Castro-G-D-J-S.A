import { useState, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import "jspdf-autotable";
import { FaPlus } from "react-icons/fa";
import ModalInsertarGastoA from "./ModalInsertarGastoA";

const TablaGastoAceite = ({ lista }) => {
    const [gastos, setGastos] = useState(lista);

    const columns = useMemo(
        () => [

            {
                header: "Id Registro",
                accessorKey: "id",
            },
            {
                header: "Factura # ",
                accessorKey: "numero_factura",
            },
            {
                header: "Monto",
                accessorKey: "monto",
            },
            {
                header: "Placa",
                accessorKey: "matricula",
            },
            {
                header: "Proveedor",
                accessorKey: "proveedor",
            },
            {
                header: "Marca",
                accessorKey: "marca",
            },
            {
                header: "Kilometraje al momento",
                accessorKey: "kilometrajeActual",
            },
            {
                header: "Duracion Aceite",
                accessorKey: "duracion",
            },
            {
                header: "Fecha",
                accessorKey: "fecha",
            },

        ],
        []
    );

    useEffect(() => {
        setGastos(lista);
    }, [lista]);

    return (
        <>
            <MaterialReactTable
                enableFullScreenToggle={true}
                enableDensityToggle={true}
                columns={columns}
                data={gastos}
                localization={MRT_Localization_ES}
                enableRowActions
                positionActionsColumn="last"
                options={{
                    exportButton: true,
                }}
                renderRowActions={({ row }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <button
                            variant="contained"
                            color="secondary"
                        >
                            Eliminar
                        </button>
                        <button
                            variant="contained"
                            color="primary"
                        >
                            Actualizar
                        </button>
                    </Box>
                )}
                renderTopToolbarCustomActions={({ table }) => (
                    <Box
                        sx={{
                            display: "flex",
                            gap: "1rem",
                            p: "0.5rem",
                            flexWrap: "wrap",
                        }}
                    >
                        <Tooltip arrow placement="right" title="Registrar Gasto">
                            <IconButton
                                size="small"
                                color="success"
                                id="btnModalInsertarGastoA"
                                data-bs-toggle="modal"
                                data-bs-target="#modalInsertarGastoA"
                            >
                                <FaPlus />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            />
            <ModalInsertarGastoA />
        </>
    );
};

export default TablaGastoAceite;