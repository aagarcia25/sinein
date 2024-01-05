import { useEffect, useState } from "react";
import ModalForm from "../../share/ModalForm";
import Progress from "../../share/Progress";
import CloseIcon from "@mui/icons-material/Close";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import CustomizedDate from "../../share/CustomizedDate";
import dayjs, { Dayjs } from "dayjs";
import { useLoadFilter } from "../../../hook/select";
import { Servicios } from "../../../services/Servicios";
import { getItem } from "../../../services/localStorage";
import { AlertS } from "../../../helpers/AlertS";
import { SelectValues } from "../../../interfaces/Share";
import SelectFrag from "../../share/SelectFrag";
export const ConfianzaModal = ({
  handleClose,
  tipo,
  dt,
}: {
  handleClose: Function;
  tipo: number;
  dt: any;
}) => {
  const [show, setShow] = useState(false);
  const [id, setid] = useState("");
  const [fa, setfa] = useState<Dayjs | null>();
  const [fna, setfna] = useState<Dayjs | null>();
  const [tipoprueba, settipoprueba] = useState("");
  const [tipopruebas, settipopruebas] = useState<SelectValues[]>([]);
  const [Nombre, setNombre] = useState("");
  const [observacion, setobservacion] = useState("");
  const [NumeroEmpleado, setNumeroEmpleado] = useState("");
  const [CURP, setCURP] = useState("");
  const [Puesto, setPuesto] = useState("");
  const [Resultado, setResultado] = useState("");
  const [Area, setArea] = useState("");
  const [FolioInterno, setFolioInterno] = useState("");

  const handleFilterChange1 = (v: string) => {
    settipoprueba(v);
  };

  const handleFilterChangefa = (v: any) => {
    setfa(v);
  };

  const handleFilterChangefna = (v: any) => {
    setfna(v);
  };
  const handleSend = () => {
    setShow(true);
    let data = {
      CHID: id,
      NUMOPERACION: tipo,
      Nombre: Nombre,
      NumeroEmpleado: NumeroEmpleado,
      CURP: CURP,
      Area: Area,
      Puesto: Puesto,
      TipoPrueba: tipoprueba,
      Resultado: Resultado,
      FechaAplicacion: fa,
      FechaNuevaAplicacion: fna,
      Observaciones: observacion,
      CHUSER: getItem("id"),
    };

    Servicios.Prueba(data).then((res) => {
      if (res.SUCCESS) {
        AlertS.fire({
          title: "!Exito!",
          text: "Se Guardo el Registro",
          icon: "success",
        });
        setShow(false);
        handleClose();
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
  useLoadFilter(3, settipopruebas);
  useEffect(() => {
    if (tipo === 2) {
      setfa(dayjs(dt.FechaAplicacion));
      setfna(dayjs(dt.FechaNuevaAplicacion));
      setid(dt.Id);
      setobservacion(dt.Observaciones);
      settipoprueba(dt.ctpid);
      setNombre(dt.Nombre);
      setNumeroEmpleado(dt.NumeroEmpleado);
      setCURP(dt.CURP);
      setArea(dt.Area);
      setPuesto(dt.Puesto);
      setResultado(dt.Resultado);
      setFolioInterno(dt.FolioInterno);
    }
  }, [dt]);
  return (
    <>
      <ModalForm
        title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}
        handleClose={handleClose}
      >
        <Progress open={show}></Progress>
        <Box boxShadow={3}>
          <Grid
            container
            item
            spacing={1}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "2%" }}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Folio Interno:
              </Typography>
              <TextField
                required
                margin="none"
                value={FolioInterno}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setFolioInterno(v.target.value)}
                size="small"
                style={{ height: "40px" }}
                disabled
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Nombre:</Typography>
              <TextField
                required
                margin="none"
                value={Nombre}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setNombre(v.target.value)}
                size="small"
                style={{ height: "40px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Número de Empleado:
              </Typography>
              <TextField
                required
                margin="none"
                value={NumeroEmpleado}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setNumeroEmpleado(v.target.value)}
                size="small"
                style={{ height: "40px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>CURP:</Typography>
              <TextField
                required
                margin="none"
                value={CURP}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setCURP(v.target.value)}
                size="small"
                style={{ height: "40px" }}
                autoComplete="off"
              />
            </Grid>
          </Grid>

          <Grid
            container
            item
            spacing={1}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "2%" }}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Área:</Typography>
              <TextField
                required
                margin="none"
                value={Area}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setArea(v.target.value)}
                size="small"
                style={{ height: "40px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
                style={{ height: "40px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Tipo de Prueba:
              </Typography>
              <SelectFrag
                value={tipoprueba}
                options={tipopruebas}
                onInputChange={handleFilterChange1}
                placeholder={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Resultado:
              </Typography>
              <TextField
                required
                margin="none"
                value={Resultado}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setResultado(v.target.value)}
                size="small"
                style={{ height: "40px" }}
                autoComplete="off"
              />
            </Grid>
          </Grid>

          <Grid
            container
            item
            spacing={1}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "2%" }}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CustomizedDate
                value={fa}
                label={"Fecha Aplicación"}
                onchange={handleFilterChangefa}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CustomizedDate
                value={fna}
                label={"Fecha Nueva Aplicación"}
                onchange={handleFilterChangefna}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
          </Grid>

          <Grid
            container
            item
            spacing={1}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "2%" }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Observación:
              </Typography>
              <TextField
                required
                margin="none"
                value={observacion}
                type="text"
                fullWidth
                size="small"
                variant="outlined"
                onChange={(v) => setobservacion(v.target.value)}
                autoComplete="off"
              />
            </Grid>
          </Grid>

          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ padding: "2%" }}
          >
            <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}>
              <Button
                fullWidth
                startIcon={<AddTaskIcon />}
                variant="contained"
                sx={{
                  backgroundColor: "green",
                }}
                className={tipo === 1 ? "guardar" : "actualizar"}
                onClick={() => handleSend()}
              >
                {tipo === 1 ? "Agregar" : "Actualizar"}
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}>
              <Button
                fullWidth
                startIcon={<CloseIcon />}
                variant="contained"
                color="error"
                className={"actualizar"}
                onClick={() => handleClose()}
              >
                {"Salir"}
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
          </Grid>
        </Box>
      </ModalForm>
    </>
  );
};
