import AddTaskIcon from "@mui/icons-material/AddTask";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../../helpers/AlertS";
import { useLoadFilter } from "../../../hook/select";
import { SelectValues } from "../../../interfaces/Share";
import { Servicios } from "../../../services/Servicios";
import { getItem } from "../../../services/localStorage";
import ModalForm from "../../share/ModalForm";
import Progress from "../../share/Progress";
import SelectFrag from "../../share/SelectFrag";
import VisorDocumentossub from "../../share/VisorDocumentossub";
import { Textarea } from "../../../helpers/inputText";
const InvestigacionModal = ({
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
  const [Hechos, setHechos] = useState("");
  const [Folio, setFolio] = useState("");
  const [VictimaNombre, setVictimaNombre] = useState("");
  const [VictimaNumeroEmpleado, setVictimaNumeroEmpleado] = useState("");
  const [VictimaCURP, setVictimaCURP] = useState("");
  const [VictimaIMSS, setVictimaIMSS] = useState("");
  const [VictimaRazonSocial, setVictimaRazonSocial] = useState("");
  const [VictimarioNombre, setVictimarioNombre] = useState("");
  const [VictimarioNumeroEmpleado, setVictimarioNumeroEmpleado] = useState("");
  const [VictimarioCURP, setVictimarioCURP] = useState("");
  const [VictimarioIMSS, setVictimarioIMSS] = useState("");
  const [VictimarioRazonSocial, setVictimarioRazonSocial] = useState("");
  const [Entrevista, setEntrevista] = useState("");
  const [PC, setPC] = useState("");
  const [Veritas, setVeritas] = useState("");
  const [Estatus, setEstatus] = useState("");
  const [Observacion, setObservacion] = useState("");

  const [antecedente, setantecedente] = useState<string>("");
  const [seguimiento, setseguimiento] = useState<string>("");
  const [cronologia, setcronologia] = useState<string>("");
  const [fuenteinf, setfuenteinf] = useState<string>("");
  const [relevantes, setrelevantes] = useState<string>("");
  const [conlusion, setconlusion] = useState<string>("");
  const [recomendaciones, setrecomendaciones] = useState<string>("");

  const [ListUO, setListUO] = useState<SelectValues[]>([]);
  const [LisMeses, setLisMeses] = useState<SelectValues[]>([]);
  const [LisEstatus, setLisEstatus] = useState<SelectValues[]>([]);

  const [activeStep, setActiveStep] = useState(0);
  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const steps = [
    "Registro",
    "Antecedente",
    "Seguimiento",
    "Cronología",
    "Fuente de Información",
    "Relevantes",
    "Conclusión",
    "Recomendaciones",
    "Evidencias Fotograficas",
  ];

  const handleFilterChange1 = (v: string) => {
    setUnidadOperativa(v);
  };

  const handleFilterChange2 = (v: string) => {
    setMes(v);
  };

  const handleFilterChange3 = (v: string) => {
    setEstatus(v);
  };

  useLoadFilter(7, setLisEstatus);
  useLoadFilter(4, setListUO);
  useLoadFilter(1, setLisMeses);

  const handleSendlist = () => {
    setShow(true);

    let data = {
      NUMOPERACION: 5,
      CHID: id,
      CHUSER: getItem("id"),
      antecedente: antecedente.replace(/[\u0080-\uFFFF]/g, ""),
      seguimiento: seguimiento.replace(/[\u0080-\uFFFF]/g, ""),
      cronologia: cronologia.replace(/[\u0080-\uFFFF]/g, ""),
      fuenteinf: fuenteinf.replace(/[\u0080-\uFFFF]/g, ""),
      relevantes: relevantes.replace(/[\u0080-\uFFFF]/g, ""),
      conlusion: conlusion.replace(/[\u0080-\uFFFF]/g, ""),
      recomendaciones: recomendaciones.replace(/[\u0080-\uFFFF]/g, ""),
    };

    Servicios.Investigacion(data).then((res) => {
      if (res.SUCCESS) {
        AlertS.fire({
          title: "!Exito!",
          text: "Se Guardo el Registro",
          icon: "success",
        });
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
      Hechos: Hechos,
      Folio: Folio,
      VictimaNombre: VictimaNombre,
      VictimaNumeroEmpleado: VictimaNumeroEmpleado,
      VictimaCURP: VictimaCURP,
      VictimaIMSS: VictimaIMSS,
      VictimaRazonSocial: VictimaRazonSocial,
      VictimarioNombre: VictimarioNombre,
      VictimarioNumeroEmpleado: VictimarioNumeroEmpleado,
      VictimarioCURP: VictimarioCURP,
      VictimarioIMSS: VictimarioIMSS,
      VictimarioRazonSocial: VictimarioRazonSocial,
      Entrevista: Entrevista,
      PC: PC,
      Veritas: Veritas,
      Estatus: Estatus,
      Observacion: Observacion,
    };

    Servicios.Investigacion(data).then((res) => {
      if (res.SUCCESS) {
        setid(res.RESPONSE.Id);
        AlertS.fire({
          title: "!Exito!",
          text: "Se Guardo el Registro",
          icon: "success",
        });
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

  useEffect(() => {
    if (tipo === 2) {
      // console.log(dt);
      setid(dt.Id);
      setUnidadOperativa(dt.UnidadOperativa);
      setDia(dt.Dia);
      setMes(dt.Mes);
      setAnio(dt.Anio);
      setHechos(dt.Hechos);
      setFolio(dt.Folio);
      setVictimaNombre(dt.VictimaNombre);
      setVictimaNumeroEmpleado(dt.VictimaNumeroEmpleado);
      setVictimaCURP(dt.VictimaCURP);
      setVictimaIMSS(dt.VictimaIMSS);
      setVictimaRazonSocial(dt.VictimaRazonSocial);
      setVictimarioNombre(dt.VictimarioNombre);
      setVictimarioNumeroEmpleado(dt.VictimarioNumeroEmpleado);
      setVictimarioCURP(dt.VictimarioCURP);
      setVictimarioIMSS(dt.VictimarioIMSS);
      setVictimarioRazonSocial(dt.VictimarioRazonSocial);
      setPC(dt.PC);
      setEntrevista(dt.Entrevista);
      setVeritas(dt.Veritas);
      setEstatus(dt.Estatus);
      setObservacion(dt.Observacion);

      setantecedente(dt.Antecedente);
      setseguimiento(dt.Seguimiento);
      setcronologia(dt.Cronologia);
      setfuenteinf(dt.Fuenteinf);
      setrelevantes(dt.Relevantes);
      setconlusion(dt.Conclusion);
      setrecomendaciones(dt.Recomendacion);
    }
  }, [dt]);

  return (
    <>
      <ModalForm
        title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}
        handleClose={handleClose}
      >
        <Progress open={show}></Progress>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={1}
          xs={12}
          sm={12}
          md={12}
          lg={12}
        >
          <Grid item xs={12} sm={12} md={12} lg={2}>
            <Button
              disabled={activeStep === 0}
              onClick={() => handleStepChange(activeStep - 1)}
            >
              Anterior
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
          <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
          <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
          <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
          <Grid item xs={12} sm={12} md={12} lg={2}>
            <Button
              disabled={activeStep === steps.length - 1}
              onClick={() => handleStepChange(activeStep + 1)}
            >
              Siguiente
            </Button>
          </Grid>
        </Grid>
        <Box p={2}>
          {activeStep === 0 && (
            // Renderizar la sección de Registro
            <>
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
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Día:
                  </Typography>
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
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Mes:
                  </Typography>
                  <SelectFrag
                    value={Mes}
                    options={LisMeses}
                    onInputChange={handleFilterChange2}
                    placeholder={""}
                    disabled={false}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Año:
                  </Typography>
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
              >
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Hechos:
                  </Typography>
                  <TextField
                    required
                    margin="none"
                    value={Hechos}
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(v) => setHechos(v.target.value)}
                    size="small"
                    style={{ height: "40px" }}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Folio:
                  </Typography>
                  <TextField
                    required
                    margin="none"
                    value={Folio}
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(v) => setFolio(v.target.value)}
                    size="small"
                    style={{ height: "40px" }}
                    disabled
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Victima:
                  </Typography>
                  <TextField
                    required
                    margin="none"
                    value={VictimaNombre}
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(v) => setVictimaNombre(v.target.value)}
                    size="small"
                    style={{ height: "40px" }}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Número de empleado:
                  </Typography>
                  <TextField
                    required
                    margin="none"
                    value={VictimaNumeroEmpleado}
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(v) => setVictimaNumeroEmpleado(v.target.value)}
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
              >
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    CURP:
                  </Typography>
                  <TextField
                    required
                    margin="none"
                    value={VictimaCURP}
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(v) => setVictimaCURP(v.target.value)}
                    size="small"
                    style={{ height: "40px" }}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    IMSS:
                  </Typography>
                  <TextField
                    required
                    margin="none"
                    value={VictimaIMSS}
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(v) => setVictimaIMSS(v.target.value)}
                    size="small"
                    style={{ height: "40px" }}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Razon social/empresa:
                  </Typography>
                  <TextField
                    required
                    margin="none"
                    value={VictimaRazonSocial}
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(v) => setVictimaRazonSocial(v.target.value)}
                    size="small"
                    style={{ height: "40px" }}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Victimario:
                  </Typography>
                  <TextField
                    required
                    margin="none"
                    value={VictimarioNombre}
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(v) => setVictimarioNombre(v.target.value)}
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
              >
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Número de empleado:
                  </Typography>
                  <TextField
                    required
                    margin="none"
                    value={VictimarioNumeroEmpleado}
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(v) =>
                      setVictimarioNumeroEmpleado(v.target.value)
                    }
                    size="small"
                    style={{ height: "40px" }}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    CURP:
                  </Typography>
                  <TextField
                    required
                    margin="none"
                    value={VictimarioCURP}
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(v) => setVictimarioCURP(v.target.value)}
                    size="small"
                    style={{ height: "40px" }}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    IMSS:
                  </Typography>
                  <TextField
                    required
                    margin="none"
                    value={VictimarioIMSS}
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(v) => setVictimarioIMSS(v.target.value)}
                    size="small"
                    style={{ height: "40px" }}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Razon social/Empresa:
                  </Typography>
                  <TextField
                    required
                    margin="none"
                    value={VictimarioRazonSocial}
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(v) => setVictimarioRazonSocial(v.target.value)}
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
              >
                <Grid item xs={12} sm={6} md={3} lg={3}>
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
                <Grid item xs={12} sm={6} md={3} lg={3}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Prueba de Confianza:
                  </Typography>
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
                <Grid item xs={12} sm={6} md={3} lg={3}>
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
                <Grid item xs={12} sm={6} md={3} lg={3}>
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
                padding={2}
                xs={12}
                sm={12}
                md={12}
                lg={12}
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
                    {tipo === 1 ? "Guardar" : "Actualizar"}
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
                    {"Cancelar"}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
                <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
              </Grid>
            </>
          )}

          {activeStep === 1 && (
            // Renderizar la sección de Registro
            <>
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
              >
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Documenta el Antecedente:
                  </Typography>

                  <Textarea
                    style={{
                      height: "350px",
                      width: "100%",
                      overflow: "auto",
                    }}
                    value={antecedente}
                    onChange={(v) => setantecedente(v.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <VisorDocumentossub
                    IdRegistro={id}
                    Modulo={"Investigacion"}
                    Tipo={"Antecedente"}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                padding={1}
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Grid item xs={12} sm={12} md={12} lg={2}>
                  <Button
                    fullWidth
                    startIcon={<AddTaskIcon />}
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                    }}
                    className={tipo === 1 ? "guardar" : "actualizar"}
                    onClick={() => handleSendlist()}
                  >
                    {tipo === 1 ? "Guardar" : "Actualizar"}
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
          {activeStep === 2 && (
            // Renderizar la sección de Registro
            <>
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
              >
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Documenta el Seguimiento:
                  </Typography>

                  <Textarea
                    style={{
                      height: "350px",
                      width: "100%",
                      overflow: "auto",
                    }}
                    value={seguimiento}
                    onChange={(v) => setseguimiento(v.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <VisorDocumentossub
                    IdRegistro={id}
                    Modulo={"Investigacion"}
                    Tipo={"Seguimiento"}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                padding={1}
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Grid item xs={12} sm={12} md={12} lg={2}>
                  <Button
                    fullWidth
                    startIcon={<AddTaskIcon />}
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                    }}
                    className={tipo === 1 ? "guardar" : "actualizar"}
                    onClick={() => handleSendlist()}
                  >
                    {tipo === 1 ? "Guardar" : "Actualizar"}
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
          {activeStep === 3 && (
            // Renderizar la sección de Registro
            <>
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
              >
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Documenta la Cronologia:
                  </Typography>

                  <Textarea
                    style={{
                      height: "350px",
                      width: "100%",
                      overflow: "auto",
                    }}
                    value={cronologia}
                    onChange={(v) => setcronologia(v.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <VisorDocumentossub
                    IdRegistro={id}
                    Modulo={"Investigacion"}
                    Tipo={"Cronologia"}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                padding={1}
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Grid item xs={12} sm={12} md={12} lg={2}>
                  <Button
                    fullWidth
                    startIcon={<AddTaskIcon />}
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                    }}
                    className={tipo === 1 ? "guardar" : "actualizar"}
                    onClick={() => handleSendlist()}
                  >
                    {tipo === 1 ? "Guardar" : "Actualizar"}
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
          {activeStep === 4 && (
            // Renderizar la sección de Registro
            <>
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
              >
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Documenta la Fuente de Información:
                  </Typography>

                  <Textarea
                    style={{
                      height: "350px",
                      width: "100%",
                      overflow: "auto",
                    }}
                    value={fuenteinf}
                    onChange={(v) => setfuenteinf(v.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <VisorDocumentossub
                    IdRegistro={id}
                    Modulo={"Investigacion"}
                    Tipo={"Informacion"}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                padding={1}
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Grid item xs={12} sm={12} md={12} lg={2}>
                  <Button
                    fullWidth
                    startIcon={<AddTaskIcon />}
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                    }}
                    className={tipo === 1 ? "guardar" : "actualizar"}
                    onClick={() => handleSendlist()}
                  >
                    {tipo === 1 ? "Guardar" : "Actualizar"}
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
          {activeStep === 5 && (
            // Renderizar la sección de Registro
            <>
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
              >
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Relevantes:
                  </Typography>

                  <Textarea
                    style={{
                      height: "350px",
                      width: "100%",
                      overflow: "auto",
                    }}
                    value={relevantes}
                    onChange={(v) => setrelevantes(v.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <VisorDocumentossub
                    IdRegistro={id}
                    Modulo={"Investigacion"}
                    Tipo={"Relevantes"}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                padding={1}
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Grid item xs={12} sm={12} md={12} lg={2}>
                  <Button
                    fullWidth
                    startIcon={<AddTaskIcon />}
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                    }}
                    className={tipo === 1 ? "guardar" : "actualizar"}
                    onClick={() => handleSendlist()}
                  >
                    {tipo === 1 ? "Guardar" : "Actualizar"}
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
          {activeStep === 6 && (
            // Renderizar la sección de Registro
            <>
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
              >
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Documenta la Conclusión:
                  </Typography>

                  <Textarea
                    style={{
                      height: "350px",
                      width: "100%",
                      overflow: "auto",
                    }}
                    value={conlusion}
                    onChange={(v) => setconlusion(v.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <VisorDocumentossub
                    IdRegistro={id}
                    Modulo={"Investigacion"}
                    Tipo={"Conclusion"}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                padding={1}
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Grid item xs={12} sm={12} md={12} lg={2}>
                  <Button
                    fullWidth
                    startIcon={<AddTaskIcon />}
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                    }}
                    className={tipo === 1 ? "guardar" : "actualizar"}
                    onClick={() => handleSendlist()}
                  >
                    {tipo === 1 ? "Guardar" : "Actualizar"}
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
          {activeStep === 7 && (
            // Renderizar la sección de Registro
            <>
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
              >
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Documenta las Recomendaciones:
                  </Typography>

                  <Textarea
                    style={{
                      height: "350px",
                      width: "100%",
                      overflow: "auto",
                    }}
                    value={recomendaciones}
                    onChange={(v) => setrecomendaciones(v.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <VisorDocumentossub
                    IdRegistro={id}
                    Modulo={"Investigacion"}
                    Tipo={"Recomendaciones"}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                padding={1}
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Grid item xs={12} sm={12} md={12} lg={2}>
                  <Button
                    fullWidth
                    startIcon={<AddTaskIcon />}
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                    }}
                    className={tipo === 1 ? "guardar" : "actualizar"}
                    onClick={() => handleSendlist()}
                  >
                    {tipo === 1 ? "Guardar" : "Actualizar"}
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
          {activeStep === 8 && (
            // Renderizar la sección de Registro
            <>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={1}
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <VisorDocumentossub
                    IdRegistro={id}
                    Modulo={"Investigacion"}
                    Tipo={"Evidencias"}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </ModalForm>
    </>
  );
};

export default InvestigacionModal;
