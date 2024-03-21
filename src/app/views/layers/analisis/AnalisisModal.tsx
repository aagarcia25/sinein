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
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { AlertS } from "../../../helpers/AlertS";
import { desencrypta } from "../../../helpers/cifrado";
import { Textarea } from "../../../helpers/inputText";
import { Servicios } from "../../../services/Servicios";
import { getItem } from "../../../services/localStorage";
import ModalForm from "../../share/ModalForm";
import Progress from "../../share/Progress";
import VisorDocumentossub from "../../share/VisorDocumentossub";
import CustomizedDate from "../../share/CustomizedDate";
export const AnalisisModal = ({
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
  const [Folio, setFolio] = useState<string>("");
  const [Asunto, setAsunto] = useState<string>("");
  const [Fecha, setFecha] = useState<Dayjs | null>(null);
  const [SitioWeb, setSitioWeb] = useState<string>("");
  const [CorreoElectronico, setCorreoElectronico] = useState<string>("");
  const [Telefonos, setTelefonos] = useState<string>("");
  const [Sector, setSector] = useState<string>("");
  const [Sede, setSede] = useState<string>("");
  const [Especialidades, setEspecialidades] = useState<string>("");
  const [Domicilio, setDomicilio] = useState<string>("");
  const [Sucursales, setSucursales] = useState<string>("");
  const [Solistica, setSolistica] = useState<string>("");
  const [InicioOperaciones, setInicioOperaciones] = useState<string>("");
  const [SAT, setSAT] = useState<string>("");
  const [Antecedente, setAntecedente] = useState<string>("");
  const [ObjetivoInforme, setObjetivoInforme] = useState<string>("");
  const [LugaresInteres, setLugaresInteres] = useState<string>("");
  const [Rutas, setRutas] = useState<string>("");
  const [Inteligencia, setInteligencia] = useState<string>("");
  const [Seguimiento, setSeguimiento] = useState<string>("");
  const [Introduccion, setIntroduccion] = useState<string>("");
  const [UbiGeo, setUbiGeo] = useState<string>("");
  const [IndiceDelictivo, setIndiceDelictivo] = useState<string>("");
  const [GraficasDelictivas, setGraficasDelictivas] = useState<string>("");
  const [IncidenciasRelevantes, setIncidenciasRelevantes] =
    useState<string>("");
  const [ZonaInteres, setZonaInteres] = useState<string>("");
  const [RutasC, setRutasC] = useState<string>("");
  const [MapaDelictivo, setMapaDelictivo] = useState<string>("");
  const [AnalisisColindancias, setAnalisisColindancias] = useState<string>("");
  const [FuenteInformacion, setFuenteInformacion] = useState<string>("");
  const [Conclusion, setConclusion] = useState<string>("");
  const [Relevantes, setRelevantes] = useState<string>("");
  const [Recomendaciones, setRecomendaciones] = useState<string>("");
  const [NumeroEmergencia, setNumeroEmergencia] = useState<string>("");
  const [Bibliografia, setBibliografia] = useState<string>("");

  const steps = [
    "Registro",
    "Antecedente",
    "Objetivo del Informe",
    "Lugares de Interés",
    "Seguimiento",
    "Introducción",
    "Ubicación Geografica",
    "Indice Delictivo",
    "Gráficas Delictivas",
    "Incidencias Relevantes",
    "Zona de Interes",
    "Rutas",
    "Mapa Delectivo",
    "Analisis de Colindacias",
    "Fuentes de Información",
    "Conclusión",
    "Relevantes",
    "Recomendaciones",
    "Números de Emergencia",
    "Bibliografía",
    "Evidencias",
  ];
  const [activeStep, setActiveStep] = useState(0);

  const handleFilterChangefa = (v: any) => {
    setFecha(v);
  };

  const handleSendlist = async () => {
    setShow(true);

    let data = {
      NUMOPERACION: 5,
      CHID: id,
      CHUSER: JSON.parse(desencrypta(JSON.parse(String(getItem("l5"))))),
      Antecedente: Antecedente.replace(/[\u0080-\uFFFF]/g, ""),
      ObjetivoInforme: ObjetivoInforme.replace(/[\u0080-\uFFFF]/g, ""),
      LugaresInteres: LugaresInteres.replace(/[\u0080-\uFFFF]/g, ""),
      Rutas: Rutas.replace(/[\u0080-\uFFFF]/g, ""),
      Inteligencia: Inteligencia.replace(/[\u0080-\uFFFF]/g, ""),
      Seguimiento: Seguimiento.replace(/[\u0080-\uFFFF]/g, ""),
      Introduccion: Introduccion.replace(/[\u0080-\uFFFF]/g, ""),
      UbiGeo: UbiGeo.replace(/[\u0080-\uFFFF]/g, ""),
      IndiceDelictivo: IndiceDelictivo.replace(/[\u0080-\uFFFF]/g, ""),
      GraficasDelictivas: GraficasDelictivas.replace(/[\u0080-\uFFFF]/g, ""),
      IncidenciasRelevantes: IncidenciasRelevantes.replace(
        /[\u0080-\uFFFF]/g,
        ""
      ),
      ZonaInteres: ZonaInteres.replace(/[\u0080-\uFFFF]/g, ""),
      RutasC: RutasC.replace(/[\u0080-\uFFFF]/g, ""),
      MapaDelictivo: MapaDelictivo.replace(/[\u0080-\uFFFF]/g, ""),
      AnalisisColindancias: AnalisisColindancias.replace(
        /[\u0080-\uFFFF]/g,
        ""
      ),
      FuenteInformacion: FuenteInformacion.replace(/[\u0080-\uFFFF]/g, ""),
      Conclusion: Conclusion.replace(/[\u0080-\uFFFF]/g, ""),
      Relevantes: Relevantes.replace(/[\u0080-\uFFFF]/g, ""),
      Recomendaciones: Recomendaciones.replace(/[\u0080-\uFFFF]/g, ""),
      NumeroEmergencia: NumeroEmergencia.replace(/[\u0080-\uFFFF]/g, ""),
      Bibliografia: Bibliografia.replace(/[\u0080-\uFFFF]/g, ""),
    };

    const res = await Servicios.Analisis(data);
    if (res.SUCCESS) {
      console.log(res.RESPONSE);
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
  };

  const handleSend = () => {
    setShow(true);
    let data = {
      CHID: id,
      CHUSER: JSON.parse(desencrypta(JSON.parse(String(getItem("l5"))))),
      NUMOPERACION: tipo,
      Asunto: Asunto,
      Fecha: Fecha,
      SitioWeb: SitioWeb,
      CorreoElectronico: CorreoElectronico,
      Telefonos: Telefonos,
      Sector: Sector,
      Sede: Sede,
      Especialidades: Especialidades,
      Domicilio: Domicilio,
      Sucursales: Sucursales,
      Solistica: Solistica,
      InicioOperaciones: InicioOperaciones,
      SAT: SAT,
      Antecedente: Antecedente,
      ObjetivoInforme: ObjetivoInforme,
      LugaresInteres: LugaresInteres,
      Rutas: Rutas,
      Inteligencia: Inteligencia,
      Seguimiento: Seguimiento,
      Introduccion: Introduccion,
      UbiGeo: UbiGeo,
      IndiceDelictivo: IndiceDelictivo,
      GraficasDelictivas: GraficasDelictivas,
      IncidenciasRelevantes: IncidenciasRelevantes,
      ZonaInteres: ZonaInteres,
      RutasC: RutasC,
      MapaDelictivo: MapaDelictivo,
      AnalisisColindancias: AnalisisColindancias,
      FuenteInformacion: FuenteInformacion,
      Conclusion: Conclusion,
      Relevantes: Relevantes,
      Recomendaciones: Recomendaciones,
      NumeroEmergencia: NumeroEmergencia,
      Bibliografia: Bibliografia,
    };
    Servicios.Analisis(data).then((res) => {
      if (res.SUCCESS) {
        setid(res.RESPONSE.Id);
        setFolio(res.RESPONSE.Folio);
        AlertS.fire({
          title: "!Exito!",
          text: "Se Guardo el Registro",
          icon: "success",
        });
        setShow(false);
        //handleClose();
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
  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  useEffect(() => {
    if (tipo === 2) {
      console.log(dt);
      setid(dt.Id);
      setFolio(dt.Folio);
      setAsunto(dt.Asunto);
      setFecha(dayjs(dt.Fecha));
      setSitioWeb(dt.SitioWeb);
      setCorreoElectronico(dt.CorreoElectronico);
      setTelefonos(dt.Telefonos);
      setSector(dt.Sector);
      setSede(dt.Sede);
      setEspecialidades(dt.Especialidades);
      setDomicilio(dt.Domicilio);
      setSucursales(dt.Sucursales);
      setSolistica(dt.Solistica);
      setInicioOperaciones(dt.InicioOperaciones);
      setSAT(dt.SAT);
      setAntecedente(dt.Antecedente);
      setObjetivoInforme(dt.ObjetivoInforme);
      setLugaresInteres(dt.LugaresInteres);
      setRutas(dt.Rutas);
      setInteligencia(dt.Inteligencia);
      setSeguimiento(dt.Seguimiento);
      setIntroduccion(dt.Introduccion);
      setUbiGeo(dt.UbiGeo);
      setIndiceDelictivo(dt.IndiceDelictivo);
      setGraficasDelictivas(dt.GraficasDelictivas);
      setIncidenciasRelevantes(dt.IncidenciasRelevantes);
      setZonaInteres(dt.ZonaInteres);
      setRutasC(dt.RutasC);
      setMapaDelictivo(dt.MapaDelictivo);
      setAnalisisColindancias(dt.AnalisisColindancias);
      setFuenteInformacion(dt.FuenteInformacion);
      setConclusion(dt.Conclusion);
      setRelevantes(dt.Relevantes);
      setRecomendaciones(dt.Recomendaciones);
      setNumeroEmergencia(dt.NumeroEmergencia);
      setBibliografia(dt.Bibliografia);
    }
  }, [dt]);

  return (
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
                  Asunto:
                </Typography>
                <TextField
                  required
                  margin="none"
                  value={Asunto}
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(v) => setAsunto(v.target.value)}
                  size="small"
                  style={{ height: "40px" }}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CustomizedDate
                  value={Fecha}
                  label="Fecha"
                  onchange={handleFilterChangefa}
                ></CustomizedDate>
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
                  autoComplete="off"
                  disabled
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
                  Sitio Web:
                </Typography>
                <TextField
                  required
                  margin="none"
                  value={SitioWeb}
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(v) => setSitioWeb(v.target.value)}
                  size="small"
                  style={{ height: "40px" }}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Correo electrónico:
                </Typography>
                <TextField
                  required
                  margin="none"
                  value={CorreoElectronico}
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(v) => setCorreoElectronico(v.target.value)}
                  size="small"
                  style={{ height: "40px" }}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Teléfonos :
                </Typography>
                <TextField
                  required
                  margin="none"
                  value={Telefonos}
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(v) => setTelefonos(v.target.value)}
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
                  Sector :
                </Typography>
                <TextField
                  required
                  margin="none"
                  value={Sector}
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(v) => setSector(v.target.value)}
                  size="small"
                  style={{ height: "40px" }}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography sx={{ fontFamily: "sans-serif" }}>Sede:</Typography>
                <TextField
                  required
                  margin="none"
                  value={Sede}
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(v) => setSede(v.target.value)}
                  size="small"
                  style={{ height: "40px" }}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Especialidades:
                </Typography>
                <TextField
                  required
                  margin="none"
                  value={Especialidades}
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(v) => setEspecialidades(v.target.value)}
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
                  Domicilio:
                </Typography>
                <TextField
                  required
                  margin="none"
                  value={Domicilio}
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(v) => setDomicilio(v.target.value)}
                  size="small"
                  style={{ height: "40px" }}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Sucursales:
                </Typography>
                <TextField
                  required
                  margin="none"
                  value={Sucursales}
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(v) => setSucursales(v.target.value)}
                  size="small"
                  style={{ height: "40px" }}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Solistica:
                </Typography>
                <TextField
                  required
                  margin="none"
                  value={Solistica}
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(v) => setSolistica(v.target.value)}
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
                  Inicio de operaciones:
                </Typography>
                <TextField
                  required
                  margin="none"
                  value={InicioOperaciones}
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(v) => setInicioOperaciones(v.target.value)}
                  size="small"
                  style={{ height: "40px" }}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography sx={{ fontFamily: "sans-serif" }}>SAT:</Typography>
                <TextField
                  required
                  margin="none"
                  value={SAT}
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(v) => setSAT(v.target.value)}
                  size="small"
                  style={{ height: "40px" }}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
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
                  value={Antecedente}
                  onChange={(v) => setAntecedente(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
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
                  Objetivo del Informe:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={ObjetivoInforme}
                  onChange={(v) => setObjetivoInforme(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
                  Tipo={"ObjetivoInforme"}
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
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Lugares de Interés:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={LugaresInteres}
                  onChange={(v) => setLugaresInteres(v.target.value)}
                />
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Rutas:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={Rutas}
                  onChange={(v) => setRutas(v.target.value)}
                />
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Inteligencia:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={Inteligencia}
                  onChange={(v) => setInteligencia(v.target.value)}
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
                  Seguimiento:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={Seguimiento}
                  onChange={(v) => setSeguimiento(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
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
                  Introducción:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={Introduccion}
                  onChange={(v) => setIntroduccion(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
                  Tipo={"Introduccion"}
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
                  Ubicación Geografica:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={UbiGeo}
                  onChange={(v) => setUbiGeo(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
                  Tipo={"UbiGeo"}
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
                  Indice Delictivo:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={IndiceDelictivo}
                  onChange={(v) => setIndiceDelictivo(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
                  Tipo={"IndiceDelictivo"}
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
                  Gráficas Delictivas:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={GraficasDelictivas}
                  onChange={(v) => setGraficasDelictivas(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
                  Tipo={"GraficasDelictivas"}
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
        {activeStep === 9 && (
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
                  Incidencia Relevantes:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={IncidenciasRelevantes}
                  onChange={(v) => setIncidenciasRelevantes(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
                  Tipo={"IncidenciasRelevantes"}
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
        {activeStep === 10 && (
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
                  Zona de Interes:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={ZonaInteres}
                  onChange={(v) => setZonaInteres(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
                  Tipo={"ZonaInteres"}
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
        {activeStep === 11 && (
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
                  Rutas:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={RutasC}
                  onChange={(v) => setRutasC(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
                  Tipo={"RutasC"}
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
        {activeStep === 12 && (
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
                  Mapa Delectivo:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={MapaDelictivo}
                  onChange={(v) => setMapaDelictivo(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
                  Tipo={"MapaDelictivo"}
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
        {activeStep === 13 && (
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
                  Analisis de Colindancias:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={AnalisisColindancias}
                  onChange={(v) => setAnalisisColindancias(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
                  Tipo={"AnalisisColindancias"}
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
        {activeStep === 14 && (
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
                  Fuentes de Información:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={FuenteInformacion}
                  onChange={(v) => setFuenteInformacion(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
                  Tipo={"FuenteInformacion"}
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
        {activeStep === 15 && (
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
                  Conclusión:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={Conclusion}
                  onChange={(v) => setConclusion(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
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
        {activeStep === 16 && (
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
                  value={Relevantes}
                  onChange={(v) => setRelevantes(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
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
        {activeStep === 17 && (
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
                  Recomendaciones:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={Recomendaciones}
                  onChange={(v) => setRecomendaciones(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
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
        {activeStep === 18 && (
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
                  Números de Emergencia:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={NumeroEmergencia}
                  onChange={(v) => setNumeroEmergencia(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
                  Tipo={"NumeroEmergencia"}
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
        {activeStep === 19 && (
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
                  Bibliografía:
                </Typography>

                <Textarea
                  style={{
                    height: "350px",
                    width: "100%",
                    overflow: "auto",
                  }}
                  value={Bibliografia}
                  onChange={(v) => setBibliografia(v.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <VisorDocumentossub
                  IdRegistro={id}
                  Modulo={"Analisis"}
                  Tipo={"Bibliografia"}
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

        {activeStep === 20 && (
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
                  Modulo={"Analisis"}
                  Tipo={"Evidencias"}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </ModalForm>
  );
};
