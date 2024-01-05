import AddTaskIcon from "@mui/icons-material/AddTask";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { SelectValues } from "../../../interfaces/Share";
import CustomizedDate from "../../share/CustomizedDate";
import ModalForm from "../../share/ModalForm";
import Progress from "../../share/Progress";
import SelectFrag from "../../share/SelectFrag";
import { useLoadFilter } from "../../../hook/select";
import { AlertS } from "../../../helpers/AlertS";
import { Servicios } from "../../../services/Servicios";
import { getItem } from "../../../services/localStorage";
export const VeritasModal = ({
  handleClose,
  tipo,
  dt,
}: {
  handleClose: Function;
  tipo: number;
  dt: any;
}) => {
  const [show, setShow] = useState(false);
  const [fa, setfa] = useState<Dayjs | null>();
  const [fna, setfna] = useState<Dayjs | null>();
  const [id, setid] = useState("");
  const [folio, setfolio] = useState("");
  const [nombre, setnombre] = useState("");
  const [numeroempleado, setnumeroempleado] = useState("");
  const [curp, setcurp] = useState("");
  const [area, setarea] = useState("");
  const [puesto, setpuesto] = useState("");
  const [observacion, setobservacion] = useState("");
  const [tipoprueba, settipoprueba] = useState("");
  const [tipopruebas, settipopruebas] = useState<SelectValues[]>([]);
  const [resultado, setresultado] = useState("");
  const [resultados, setresultados] = useState<SelectValues[]>([]);

  const handleFilterChange1 = (v: string) => {
    settipoprueba(v);
  };

  const handleFilterChange2 = (v: string) => {
    setresultado(v);
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
      Nombre: nombre,
      NumeroEmpleado: numeroempleado,
      CURP: curp,
      Area: area,
      Puesto: puesto,
      TipoPrueba: tipoprueba,
      Resultado: resultado,
      FechaAplicacion: fa,
      FechaNuevaAplicacion: fna,
      Observaciones: observacion,
      CHUSER: getItem("id"),
    };

    Servicios.Veritas(data).then((res) => {
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
  useLoadFilter(2, setresultados);

  useEffect(() => {
    if (tipo === 2) {
      setfa(dayjs(dt.FechaAplicacion));
      setfna(dayjs(dt.FechaNuevaAplicacion));
      setid(dt.Id);
      setfolio(dt.FolioInterno);
      setnombre(dt.Nombre);
      setnumeroempleado(dt.NumeroEmpleado);
      setcurp(dt.CURP);
      setarea(dt.Area);
      setpuesto(dt.Puesto);
      setobservacion(dt.Observaciones);
      settipoprueba(dt.ctpid);
      setresultado(dt.crid);
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
                value={folio}
                type="text"
                fullWidth
                size="small"
                variant="outlined"
                onChange={(v) => setfolio(v.target.value)}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Nombre:</Typography>
              <TextField
                required
                margin="none"
                value={nombre}
                type="text"
                fullWidth
                size="small"
                variant="outlined"
                onChange={(v) => setnombre(v.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Número de Empleado
              </Typography>
              <TextField
                required
                margin="none"
                value={numeroempleado}
                type="text"
                fullWidth
                size="small"
                variant="outlined"
                onChange={(v) => setnumeroempleado(v.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>CURP</Typography>
              <TextField
                required
                margin="none"
                value={curp}
                type="text"
                fullWidth
                size="small"
                variant="outlined"
                onChange={(v) => setcurp(v.target.value)}
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
              <Typography sx={{ fontFamily: "sans-serif" }}>Área</Typography>
              <TextField
                required
                margin="none"
                value={area}
                type="text"
                fullWidth
                size="small"
                variant="outlined"
                onChange={(v) => setarea(v.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Puesto</Typography>
              <TextField
                required
                margin="none"
                value={puesto}
                type="text"
                fullWidth
                size="small"
                variant="outlined"
                onChange={(v) => setpuesto(v.target.value)}
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
              <SelectFrag
                value={resultado}
                options={resultados}
                onInputChange={handleFilterChange2}
                placeholder={""}
                disabled={false}
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
