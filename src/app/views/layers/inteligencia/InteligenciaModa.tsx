import { useEffect, useState } from "react";
import ModalForm from "../../share/ModalForm";
import Progress from "../../share/Progress";
import CloseIcon from "@mui/icons-material/Close";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { getItem } from "../../../services/localStorage";
import { AlertS } from "../../../helpers/AlertS";
import { Servicios } from "../../../services/Servicios";
import SelectFrag from "../../share/SelectFrag";
import { SelectValues } from "../../../interfaces/Share";
import { useLoadFilter } from "../../../hook/select";
export const InteligenciaModa = ({
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
  const [UnidadOperativa, setUnidadOperativa] = useState("");
  const [Dia, setDia] = useState("");
  const [Mes, setMes] = useState("");
  const [Anio, setAnio] = useState("");
  const [Tipo, setTipo] = useState("");
  const [Puesto, setPuesto] = useState("");
  const [Nombre, setNombre] = useState("");
  const [CURP, setCURP] = useState("");
  const [IMSS, setIMSS] = useState("");
  const [Solicitante, setSolicitante] = useState("");
  const [Form, setForm] = useState("");
  const [Veritas, setVeritas] = useState("");
  const [Entrevista, setEntrevista] = useState("");
  const [PC, setPC] = useState("");
  const [Estatus, setEstatus] = useState("");
  const [Observacion, setObservacion] = useState("");
  const [FolioInterno, setFolioInterno] = useState("");
  const [LisMeses, setLisMeses] = useState<SelectValues[]>([]);
  const [ListUO, setListUO] = useState<SelectValues[]>([]);
  const [LisEstatus, setLisEstatus] = useState<SelectValues[]>([]);
  const handleFilterChange1 = (v: string) => {
    setUnidadOperativa(v);
  };

  const handleFilterChange2 = (v: string) => {
    setMes(v);
  };
  const handleFilterChange3 = (v: string) => {
    setEstatus(v);
  };
  useLoadFilter(4, setListUO);
  useLoadFilter(1, setLisMeses);
  useLoadFilter(7, setLisEstatus);

  const handleSend = () => {
    setShow(true);
    let data = {
      CHID: id,
      NUMOPERACION: tipo,
      CHUSER: getItem("id"),
      UnidadOperativa: UnidadOperativa,
      Dia: Dia,
      Mes: Mes,
      Anio: Anio,
      Tipo: Tipo,
      Puesto: Puesto,
      Nombre: Nombre,
      CURP: CURP,
      IMSS: IMSS,
      Solicitante: Solicitante,
      Form: Form,
      Veritas: Veritas,
      Entrevista: Entrevista,
      PC: PC,
      Estatus: Estatus,
      Observacion: Observacion,
    };

    Servicios.Inteligencia(data).then((res) => {
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

  useEffect(() => {
    if (tipo === 2) {
      console.log(dt);
      setid(dt.Id);
      setUnidadOperativa(dt.UnidadOperativa);
      setDia(dt.Dia);
      setMes(dt.Mes);
      setAnio(dt.Anio);
      setPC(dt.PC);
      setEntrevista(dt.Entrevista);
      setVeritas(dt.Veritas);
      setEstatus(dt.Estatus);
      setObservacion(dt.Observacion);
      setFolioInterno(dt.Folio);
      setForm(dt.Form);
      setIMSS(dt.IMSS);
      setCURP(dt.CURP);
      setSolicitante(dt.Solicitante);
      setTipo(dt.Tipo);
      setPuesto(dt.Puesto);
      setNombre(dt.Nombre);
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
                Unidad Operativa:
              </Typography>
              <SelectFrag
                value={UnidadOperativa}
                options={ListUO}
                onInputChange={handleFilterChange1}
                placeholder={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Día:</Typography>
              <TextField
                required
                margin="none"
                value={Dia}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setDia(v.target.value)}
                size="small"
                style={{ height: "40px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Mes:</Typography>
              <SelectFrag
                value={Mes}
                options={LisMeses}
                onInputChange={handleFilterChange2}
                placeholder={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Año:</Typography>
              <TextField
                required
                margin="none"
                value={Anio}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setAnio(v.target.value)}
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
              <Typography sx={{ fontFamily: "sans-serif" }}>Tipo:</Typography>
              <TextField
                required
                margin="none"
                value={Tipo}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setTipo(v.target.value)}
                size="small"
                style={{ height: "40px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Puesto/Situación:
              </Typography>
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
                Nombre del examinado:
              </Typography>
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
                style={{ height: "40px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Solicitante:
              </Typography>
              <TextField
                required
                margin="none"
                value={Solicitante}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setSolicitante(v.target.value)}
                size="small"
                style={{ height: "40px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Veritas:
              </Typography>
              <TextField
                required
                margin="none"
                value={Veritas}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setVeritas(v.target.value)}
                size="small"
                style={{ height: "40px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Entrevista:
              </Typography>
              <TextField
                required
                margin="none"
                value={Entrevista}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setEntrevista(v.target.value)}
                size="small"
                style={{ height: "40px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>PC:</Typography>
              <TextField
                required
                margin="none"
                value={PC}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setPC(v.target.value)}
                size="small"
                style={{ height: "40px" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Estatus:
              </Typography>
              <SelectFrag
                value={Estatus}
                options={LisEstatus}
                onInputChange={handleFilterChange3}
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
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Observación:
              </Typography>
              <TextField
                required
                margin="none"
                value={Observacion}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setObservacion(v.target.value)}
                size="small"
                style={{ height: "40px" }}
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
