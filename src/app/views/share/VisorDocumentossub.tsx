import DownloadingIcon from "@mui/icons-material/Downloading";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { Box, Grid, IconButton, Modal, ToggleButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { base64ToArrayBuffer } from "../../helpers/Files";
import { Toast } from "../../helpers/Toast";
import { Servicios } from "../../services/Servicios";
import { getItem } from "../../services/localStorage";
import ButtonsDeleted from "./ButtonsDeleted";
import { ButtonsDetail } from "./ButtonsDetail";
import MUIXDataGridFlex from "./MUIXDataGridFlex";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 4,
};

const VisorDocumentossub = ({
  IdRegistro,
  Modulo,
  Tipo,
}: {
  IdRegistro: string;
  Modulo: string;
  Tipo: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([]);
  const [URLruta, setURLRuta] = useState<string>("");
  const [tipoext, setTipoext] = useState<string>("");

  const consulta = () => {
    let data = {
      NUMOPERACION: 2,
      IdRegistro: IdRegistro,
      Modulo: Modulo,
      Tipo: Tipo,
    };

    Servicios.FilesAdmin(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setData(res.RESPONSE);
      } else {
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  // Luego, puedes llamar a este método con el CHID y FileName adecuados
  const handleDescargarFile = (v: any) => {
    const tipoext = v.row.FileName.split(".").pop().toLowerCase();

    const data = {
      CHID: v.row.id,
    };

    Servicios.GetDocumento(data)
      .then((res) => {
        if (res.SUCCESS) {
          const fileData = res.RESPONSE;
          // Crear un Blob a partir de los datos y tipo de archivo
          const blob = new Blob([base64ToArrayBuffer(String(fileData))], {
            type: getFileMimeType(tipoext),
          });
          // Crear un enlace de descarga
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = v.row.FileName; // Puedes establecer un nombre de archivo personalizado aquí
          // Simular un clic en el enlace para iniciar la descarga
          document.body.appendChild(link);
          link.click();
          // Eliminar el enlace después de la descarga
          document.body.removeChild(link);
        } else {
          Swal.fire("¡Error!", res.STRMESSAGE, "error");
        }
      })
      .catch((error) => {
        // Manejar errores de la petición
        console.error("Error al obtener el documento:", error);
        Swal.fire("¡Error!", "Error al obtener el documento.", "error");
      });
  };

  // Función para obtener el tipo MIME correcto para diferentes extensiones de archivo
  const getFileMimeType = (extension: string): string => {
    switch (extension) {
      case "png":
        return "image/png";
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      default:
        return "application/octet-stream";
    }
  };

  const handleVer = (v: any) => {
    setTipoext(v.row.FileName.split(".").pop());

    let data = {
      CHID: v.row.id,
    };

    Servicios.GetDocumento(data).then((res) => {
      if (res.SUCCESS) {
        //  console.log(tipoext);
        var bufferArray = base64ToArrayBuffer(String(res.RESPONSE));
        var blobStore = new Blob([bufferArray], { type: tipoext });
        var data = window.URL.createObjectURL(blobStore);
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.href = data;
        setURLRuta(link.href);
        handleOpen();
      } else {
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const ProcesaSPeis = (event: React.ChangeEvent<HTMLInputElement>) => {
    let count = 0;
    let encontrados: any[] = [];
    let counfiles = event?.target?.files?.length;
    let peticiones: any[] = [];

    //Recorremos los registros de la busqueda
    for (let i = 0; i < Number(counfiles); i++) {
      let file = event?.target?.files?.[i] || "";
      let namefile = event?.target?.files?.[i].name || "";
      encontrados.push({ Archivo: file, NOMBRE: namefile });
    }

    encontrados.map((item: any) => {
      const formData = new FormData();
      formData.append("NUMOPERACION", "1");
      formData.append("IdRegistro", IdRegistro);
      formData.append("Modulo", Modulo);
      formData.append("Tipo", Tipo);
      formData.append("CHUSER", getItem("id"));
      formData.append("FILE", item.Archivo, item.NOMBRE);

      let p = axios.post(
        process.env.REACT_APP_APPLICATION_BASE_URL + "SaveFiles",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
            Session: JSON.parse(String(getItem("l7"))),
          },
        }
      );
      peticiones.push(p);
    });

    axios.all(peticiones).then((resposeArr) => {
      resposeArr.map((item) => {
        if (item.data.SUCCESS) {
          count++;
        } else {
          count--;
        }
      });

      if (count == 0 || count == -1) {
        Swal.fire("¡Error!", "No se Realizo la Operación", "error");
      } else {
        Swal.fire({
          icon: "success",
          title: "Información",
          text: "Archivos Subidos " + count,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            consulta();
          }
        });
      }
    });
  };

  const handleAccion = (v: any) => {
    Swal.fire({
      icon: "info",
      title: "¿Estás seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(v);
        let data = {
          NUMOPERACION: 3,
          // modulo: obj.modulo,
          modulo_id: "122",
          // ruta: obj.ruta,
          CHID: v.data.id,
        };

        Servicios.FilesAdmin(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });
            consulta();
          } else {
            Swal.fire("¡Error!", res.STRMESSAGE, "error");
          }
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
    },
    {
      field: "Ruta",
      width: 10,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDeleted
              handleAccion={handleAccion}
              row={v}
              show={true}
            ></ButtonsDeleted>
            <ButtonsDetail
              title={"Ver"}
              handleFunction={handleVer}
              show={true}
              icon={<RemoveRedEyeIcon />}
              row={v}
            ></ButtonsDetail>
            <ButtonsDetail
              title={"Descargar"}
              handleFunction={handleDescargarFile}
              show={true}
              icon={<DownloadingIcon />}
              row={v}
            ></ButtonsDetail>
          </>
        );
      },
    },
    {
      field: "FileName",
      description: "Nombre",
      headerName: "Nombre",
      width: 250,
    },
  ];

  useEffect(() => {
    consulta();
  }, []);

  return (
    <div>
      <ToggleButton value="check">
        <IconButton
          color="primary"
          aria-label="upload documento"
          component="label"
          size="small"
        >
          <input
            multiple
            hidden
            accept="image/*"
            type="file"
            value=""
            onChange={(v) => ProcesaSPeis(v)}
          />
          <FileUploadIcon />
        </IconButton>
      </ToggleButton>
      <MUIXDataGridFlex columns={columns} rows={data} />

      {open ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid
              container
              spacing={1}
              style={{ width: "100%", height: "100%" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  border: "2px solid #000",
                  padding: 16,
                }}
              >
                <img
                  src={URLruta}
                  alt="Archivo"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </Grid>
          </Box>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default VisorDocumentossub;
