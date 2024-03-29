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
import { getItem } from "../../../services/localStorage";
import Swal from "sweetalert2";
import InteligenciaModa from "./InteligenciaModa";
import { desencrypta } from "../../../helpers/cifrado";
import ButtonsShare from "../../share/ButtonsShare";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import { base64ToArrayBuffer } from "../../../helpers/Files";
export const Inteligencia = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [vrows, setVrows] = useState({});
  const [tipo, setTipo] = useState(0);
  const [openModal, setopenModal] = useState<boolean>(false);

  const dowloandfile = (v: any) => {
    setShow(true);
    const data = {
      CHID: v.data.id,
      TIPO: "INTELIGENCIA",
      SALIDA: v.tipo,
    };

    Servicios.informes(data)
      .then((res) => {
        if (res.SUCCESS) {
          const fileData = res.RESPONSE;
          const tipoMIME =
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

          const blob = new Blob([base64ToArrayBuffer(String(fileData))], {
            type: tipoMIME,
          });
          const url = URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = v.data.row.Folio;

          // Evento de progreso
          const onProgress = (event: any) => {
            if (event.lengthComputable) {
              const percentComplete = (event.loaded / event.total) * 100;
              /*console.log(
                `Descarga: ${percentComplete.toFixed(2)}% completada`
              );*/
              // Aquí puedes actualizar tu interfaz de usuario con el porcentaje
            }
          };

          // Configurar el objeto XMLHttpRequest
          const xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.responseType = "blob";

          // Agregar el evento de progreso
          xhr.addEventListener("progress", onProgress);

          // Evento de carga completada
          xhr.onload = () => {
            if (xhr.status === 200) {
              // Simular un clic en el enlace para iniciar la descarga
              document.body.appendChild(link);
              link.click();
              // Eliminar el enlace después de la descarga
              document.body.removeChild(link);
            }
          };

          // Iniciar la solicitud
          xhr.send();
          setShow(false);
        } else {
          Swal.fire("¡Error!", res.STRMESSAGE, "error");
        }
      })
      .catch((error) => {
        // Manejar errores de la petición
        console.error("Error al obtener el documento:", error);
        Swal.fire("¡Error!", "Error al obtener el documento.", "error");
        setShow(false);
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

        Servicios.Inteligencia(data).then((res) => {
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

  const handleSend = async () => {
    setShow(true);
    let data = {
      NUMOPERACION: 4,
    };

    try {
      const res = await Servicios.Inteligencia(data);
      if (res.SUCCESS) {
        console.log(res.RESPONSE);
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
    } catch (error) {
      setShow(false);
      AlertS.fire({
        title: "¡Error!",
        text: "Ocurrió un error al enviar los datos",
        icon: "error",
      });
      console.error("Error:", error);
    }
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
      width: 130,
      renderCell: (v: any) => {
        return (
          <>
            <ButtonsShare
              title={"Descargar Informe en WORD"}
              handleFunction={dowloandfile}
              show={true}
              icon={<ArtTrackIcon />}
              row={v}
              tipo={"word"}
            />
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
      headerName: "Unidad Operativa",
      description: "Unidad Operativa",
      width: 200,
    },
    {
      field: "Dia",
      headerName: "Día",
      description: "Día",
      width: 100,
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
      width: 100,
    },

    {
      field: "Folio",
      headerName: "Folio Interno",
      description: "Folio Interno",
      width: 150,
    },
  ];

  useEffect(() => {
    handleSend();
  }, []);
  return (
    <div>
      <TitleComponent title={"Inteligencia"} show={show} />

      <Grid container spacing={1} padding={0}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ButtonsAdd handleOpen={handleOpen} agregar={true} />
          <MUIXDataGrid columns={columnsRel} rows={data} />
        </Grid>
      </Grid>
      {openModal ? (
        <InteligenciaModa handleClose={handleClose} tipo={tipo} dt={vrows} />
      ) : (
        ""
      )}
    </div>
  );
};
