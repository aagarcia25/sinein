import { Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ButtonsAdd from "../../share/ButtonsAdd";
import ButtonsDeleted from "../../share/ButtonsDeleted";
import ButtonsEdit from "../../share/ButtonsEdit";
import MUIXDataGrid from "../../share/MUIXDataGrid";
import TitleComponent from "../../share/TitleComponent";
import { Servicios } from "../../../services/Servicios";
import { AlertS } from "../../../helpers/AlertS";
import Swal from "sweetalert2";
import { getItem } from "../../../services/localStorage";
import { UsuariosModal } from "./usuariosModal";
import { desencrypta } from "../../../helpers/cifrado";

export const Usuarios = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [vrows, setVrows] = useState({});
  const [tipo, setTipo] = useState(0);
  const [openModal, setopenModal] = useState<boolean>(false);

  const handleSend = () => {
    setShow(true);
    let data = {
      NUMOPERACION: 4,
    };

    Servicios.usuarios(data).then((res) => {
      console.log(res);
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
          CHUSER: JSON.parse(desencrypta(JSON.parse(String(getItem("l5"))))),
        };

        Servicios.usuarios(data).then((res) => {
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
  const columnsRel: GridColDef[] = [
    {
      field: "Id",
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
      field: "Usuario",
      headerName: "Usuario",
      description: "Usuario",
      width: 100,
    },
    {
      field: "email",
      headerName: "Email",
      description: "Email",
      width: 200,
    },

    {
      field: "nombre",
      headerName: "Nombre",
      description: "Nombre",
      width: 150,
    },
    {
      field: "apellidopaterno",
      headerName: "Apellido Paterno",
      description: "Apellido Paterno",
      width: 200,
    },
    {
      field: "apellidomaterno",
      headerName: "Apellido Materno",
      description: "Apellido Materno",
      width: 150,
    },
  ];

  useEffect(() => {
    handleSend();
  }, []);

  return (
    <div>
      <TitleComponent title={"Administración de Usuarios"} show={show} />

      <Grid container spacing={1} padding={0}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ButtonsAdd handleOpen={handleOpen} agregar={true} />
          <MUIXDataGrid columns={columnsRel} rows={data} />
        </Grid>
      </Grid>

      {openModal ? (
        <UsuariosModal handleClose={handleClose} tipo={tipo} dt={vrows} />
      ) : (
        ""
      )}
    </div>
  );
};
