import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  ToggleButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { useEffect, useState } from "react";
import { AlertS } from "../../../helpers/AlertS";
import { IEmpleos } from "../../../interfaces/Share";
import { Servicios } from "../../../services/Servicios";
import ButtonsEdit from "../../share/ButtonsEdit";
import CustomizedDate from "../../share/CustomizedDate";
import MUIXDataGrid from "../../share/MUIXDataGrid";
import Swal from "sweetalert2";
import ButtonsDeleted from "../../share/ButtonsDeleted";
import { getItem } from "../../../services/localStorage";
import { desencrypta } from "../../../helpers/cifrado";
import dayjs, { Dayjs } from "dayjs";
export default function Empleos({
  idInteligencia,
}: {
  idInteligencia: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState<IEmpleos[]>([]);
  const [tipo, setTipo] = useState(0);
  const [id, setid] = useState("");
  const [Empresa, setEmpresa] = useState("");
  const [Puesto, setPuesto] = useState("");
  const [Fecha, setFecha] = useState<Dayjs | null>();
  const [Duracion, setDuracion] = useState("");
  const [CV, setCV] = useState("");
  const [CVform, setCVform] = useState("");
  const [LinkeId, setLinkeId] = useState("");
  const [IMSS, setIMSS] = useState("");
  const [Form, setForm] = useState("");
  const [Carta, setCarta] = useState("");
  const [MotivoSalida, setMotivoSalida] = useState("");

  const handleFilterChangefa = (v: any) => {
    setFecha(v);
  };

  const handleEdit = (v: any) => {
    setTipo(2);
    setid(v.data.row.id);
    setEmpresa(v.data.row.Empresa);
    setPuesto(v.data.row.Puesto);
    setFecha(dayjs(v.data.row.Fecha));
    setDuracion(v.data.row.Duracion);
    setCV(v.data.row.CV);
    setCVform(v.data.row.CVform);
    setLinkeId(v.data.row.LinkeId);
    setIMSS(v.data.row.IMSS);
    setForm(v.data.row.Form);
    setCarta(v.data.row.Carta);
    setMotivoSalida(v.data.row.MotivoSalida);
    setOpen(true);
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

  const handleClose = () => {
    setEmpresa("");
    setPuesto("");
    setDuracion("");
    setCV("");
    setCVform("");
    setLinkeId("");
    setIMSS("");
    setForm("");
    setCarta("");
    setMotivoSalida("");
    handlerows();
    setOpen(false);
  };
  const handlerows = () => {
    let data = {
      NUMOPERACION: 4,
      CHID: idInteligencia,
    };

    Servicios.Empleos(data).then((res) => {
      if (res.SUCCESS) {
        setRows(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: "Sin Respuesta",
          icon: "error",
        });
      }
    });
  };
  const handleSend = () => {
    let data = {
      NUMOPERACION: 1,
      CHID: id,
      IdInteligencia: idInteligencia,
      Empresa: Empresa,
      Puesto: Puesto,
      Fecha: Fecha,
      Duracion: Duracion,
      CV: CV,
      CVform: CVform,
      LinkeId: LinkeId,
      IMSS: IMSS,
      Form: Form,
      Carta: Carta,
      MotivoSalida: MotivoSalida,
    };

    Servicios.Empleos(data).then((res) => {
      if (res.SUCCESS) {
        AlertS.fire({
          title: "Exito!",
          text: "Se agrego el registro",
          icon: "info",
        });
        handleClose();
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: "Sin Respuesta",
          icon: "error",
        });
      }
    });
  };

  const columns: GridColDef[] = [
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
    { field: "Empresa", headerName: "Empresa", width: 180, editable: true },
    { field: "Puesto", headerName: "Puesto", width: 180, editable: true },
    {
      field: "Fecha",
      type: "date",
      headerName: "Fecha",
      width: 120,
      editable: true,
      valueGetter: (params) => new Date(params.value),
    },
    { field: "Duracion", headerName: "Duracion", width: 180, editable: true },
    { field: "CV", headerName: "CV", width: 180, editable: true },
    { field: "CVform", headerName: "CVform", width: 180, editable: true },
    { field: "LinkeId", headerName: "LinkeId", width: 180, editable: true },
    { field: "IMSS", headerName: "IMSS", width: 180, editable: true },
    { field: "Form", headerName: "Form", width: 180, editable: true },
    { field: "Carta", headerName: "Carta", width: 180, editable: true },
    {
      field: "MotivoSalida",
      headerName: "MotivoSalida",
      width: 180,
      editable: true,
    },
  ];

  useEffect(() => {
    handlerows();
  }, []);

  return (
    <>
      <Box
        sx={{
          height: 400,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <Tooltip title={"Agregar"}>
          <ToggleButton
            className="guardar"
            size="large"
            value="check"
            onClick={() => setOpen(true)}
          >
            <AddBoxIcon color="success" />
          </ToggleButton>
        </Tooltip>
        <MUIXDataGrid columns={columns} rows={rows} />
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Ingrese los Datos</DialogTitle>
        <DialogContent dividers>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Empresa:
              </Typography>
              <TextField
                required
                margin="none"
                value={Empresa}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setEmpresa(v.target.value)}
                size="small"
                style={{ height: "50px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Puesto:</Typography>
              <TextField
                required
                margin="none"
                value={Puesto}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setPuesto(v.target.value)}
                size="small"
                style={{ height: "50px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={4}>
              <CustomizedDate
                value={Fecha}
                label={"Fechas:"}
                onchange={handleFilterChangefa}
              ></CustomizedDate>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Duración:
              </Typography>
              <TextField
                required
                margin="none"
                value={Duracion}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setDuracion(v.target.value)}
                size="small"
                style={{ height: "50px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontFamily: "sans-serif" }}>CV:</Typography>
              <TextField
                required
                margin="none"
                value={CV}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setCV(v.target.value)}
                size="small"
                style={{ height: "50px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                CV FORM:
              </Typography>
              <TextField
                required
                margin="none"
                value={CVform}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setCVform(v.target.value)}
                size="small"
                style={{ height: "50px" }}
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                LinkedIn:
              </Typography>
              <TextField
                required
                margin="none"
                value={LinkeId}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setLinkeId(v.target.value)}
                size="small"
                style={{ height: "50px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontFamily: "sans-serif" }}>IMSS:</Typography>
              <TextField
                required
                margin="none"
                value={IMSS}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setIMSS(v.target.value)}
                size="small"
                style={{ height: "50px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontFamily: "sans-serif" }}>FORM:</Typography>
              <TextField
                required
                margin="none"
                value={Form}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setForm(v.target.value)}
                size="small"
                style={{ height: "50px" }}
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Carta:</Typography>
              <TextField
                required
                margin="none"
                value={Carta}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setCarta(v.target.value)}
                size="small"
                style={{ height: "50px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={8}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Motivo de Salida:
              </Typography>
              <TextField
                required
                margin="none"
                value={MotivoSalida}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setMotivoSalida(v.target.value)}
                size="small"
                style={{ height: "50px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="success" onClick={handleSend}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
