import { Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ButtonsAdd from "../../share/ButtonsAdd";
import ButtonsDeleted from "../../share/ButtonsDeleted";
import ButtonsEdit from "../../share/ButtonsEdit";
import MUIXDataGrid from "../../share/MUIXDataGrid";
import TitleComponent from "../../share/TitleComponent";
import { AnalisisModal } from "./AnalisisModal";
import { Servicios } from "../../../services/Servicios";
import Swal from "sweetalert2";
import { getItem } from "../../../services/localStorage";
import { AlertS } from "../../../helpers/AlertS";

export const Analisis = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [vrows, setVrows] = useState({});
  const [tipo, setTipo] = useState(0);
  const [openModal, setopenModal] = useState<boolean>(false);

  const handleOpen = (v: any) => {
    setTipo(1);
    setopenModal(true);
  };
  const handleEdit = (v: any) => {
    setTipo(2);
    setVrows(v.data.row);
    setopenModal(true);
  };
  const handleDeleted = (v: any) => {
    Swal.fire({
      icon: "question",
      title: "Eliminación",
      text: "El Movimiento Seleccionado se Eliminará",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = {
          NUMOPERACION: 3,
          CHID: v.data.row.Id,
          CHUSER: getItem("id"),
        };

        Servicios.Analisis(data).then((res) => {
          if (res.SUCCESS) {
            AlertS.fire({
              title: res.STRMESSAGE,
              icon: "success",
            }).then(async (result) => {
              if (result.isConfirmed) {
                handleSend();
              }
            });
          } else {
            AlertS.fire({
              title: "¡Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      }
    });
  };

  const handleSend = () => {
    setShow(true);
    let data = {
      NUMOPERACION: 4,
    };

    Servicios.Analisis(data).then((res) => {
      if (res.SUCCESS) {
        setData(res.RESPONSE);
        setShow(false);
      } else {
        setShow(false);
        AlertS.fire({
          title: "¡Error!",
          text: "Sin Respuesta",
          icon: "error",
        });
      }
    });
  };

  const handleClose = () => {
    handleSend();
    setopenModal(false);
  };

  const columnsRel: GridColDef[] = [
    {
      field: "id",
    },
    {
      field: "Operaciones",
      disableExport: true,
      headerName: "Operaciones",
      description: "Operaciones",
      sortable: false,
      width: 100,
      renderCell: (v: any) => {
        return (
          <>
            <ButtonsEdit
              handleAccion={handleEdit}
              row={v}
              show={true}
            ></ButtonsEdit>
            <ButtonsDeleted
              handleAccion={handleDeleted}
              row={v}
              show={true}
            ></ButtonsDeleted>
          </>
        );
      },
    },

    {
      field: "cuDescripcion",
      headerName: "Lugar",
      description: "Lugar",
      width: 150,
    },
    {
      field: "Dia",
      headerName: "Día",
      description: "Día",
      width: 70,
    },
    {
      field: "cmDescripcion",
      headerName: "Mes",
      description: "Mes",
      width: 100,
    },
    {
      field: "Anio",
      headerName: "Año",
      description: "Año",
      width: 70,
    },
    {
      field: "FolioInterno",
      headerName: "Folio Interno",
      description: "Folio Interno",
      width: 120,
    },
    {
      field: "Tipo",
      headerName: "Tipo",
      description: "Tipo",
      width: 150,
    },

    {
      field: "Hechos",
      headerName: "Hechos",
      description: "Hechos",
      width: 100,
    },
    {
      field: "ceDescripcion",
      headerName: "Estatus",
      description: "Estatus",
      width: 100,
    },
    {
      field: "Observacion",
      headerName: "Observación",
      description: "Observación",
      width: 300,
    },
  ];

  useEffect(() => {
    handleSend();
  }, []);

  return (
    <div>
      <TitleComponent title={"Analisis"} show={show} />

      <Grid container spacing={1} padding={0}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ButtonsAdd handleOpen={handleOpen} agregar={true} />
          <MUIXDataGrid columns={columnsRel} rows={data} />
        </Grid>
      </Grid>
      {openModal ? (
        <AnalisisModal handleClose={handleClose} tipo={tipo} dt={vrows} />
      ) : (
        ""
      )}
    </div>
  );
};
