import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
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
import Swal from "sweetalert2";
import { AlertS } from "../../../helpers/AlertS";
import { Textarea } from "../../../helpers/inputText";
import { useLoadFilter } from "../../../hook/select";
import { SelectValues } from "../../../interfaces/Share";
import { Servicios } from "../../../services/Servicios";
import { getItem } from "../../../services/localStorage";
import CustomizedDate from "../../share/CustomizedDate";
import ModalForm from "../../share/ModalForm";
import Progress from "../../share/Progress";
import SelectFrag from "../../share/SelectFrag";
import VisorDocumentossub from "../../share/VisorDocumentossub";
import Empleos from "./Empleos";
import axios from "axios";
import { base64ToArrayBuffer } from "../../../helpers/Files";
import { desencrypta } from "../../../helpers/cifrado";
const InteligenciaModa = ({
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
  const [URLruta, setURLRuta] = useState<string>("");
  const [nombreArchivo, setNombreArchivo] = useState("");

  const [UnidadOperativa, setUnidadOperativa] = useState("");
  const [Dia, setDia] = useState("");
  const [Mes, setMes] = useState("");
  const [Anio, setAnio] = useState("");
  const [Folio, setFolio] = useState<string>("");
  const [Motivo, setMotivo] = useState<string>("");
  const [Nombre, setNombre] = useState<string>("");
  const [NumeroEmpleado, setNumeroEmpleado] = useState<string>("");
  const [Edad, setEdad] = useState<string>("");
  const [FechaNacimiento, setFechaNacimiento] = useState<Dayjs | null>(null);
  const [EstadoC, setEstadoC] = useState<string>("");
  const [Escolaridad, setEscolaridad] = useState<string>("");
  const [Telefono, setTelefono] = useState<string>("");
  const [CURP, setCURP] = useState<string>("");
  const [RFC, setRFC] = useState<string>("");
  const [Seguro, setSeguro] = useState<string>("");
  const [Correo, setCorreo] = useState<string>("");
  const [Direccion, setDireccion] = useState<string>("");
  const [PrincipalHa, setPrincipalHa] = useState<string>("");
  const [PruebaVe, setPruebaVe] = useState<string>("");
  const [Normas, setNormas] = useState<string>("");
  const [Confesiones, setConfesiones] = useState<string>("");
  const [PruebaConfianza, setPruebaConfianza] = useState<string>("");
  const [Entrevista, setEntrevista] = useState<string>("");
  const [FuentesInf, setFuentesInf] = useState<string>("");
  const [Relevantes, setRelevantes] = useState<string>("");
  const [Conclusion, setConclusion] = useState<string>("");
  const [Recomendacion, setRecomendacion] = useState<string>("");
  const [newVideo, setNewVideo] = useState(Object);
  const [ListUO, setListUO] = useState<SelectValues[]>([]);
  const [LisMeses, setLisMeses] = useState<SelectValues[]>([]);

  const [activeStep, setActiveStep] = useState(0);
  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleFilterChangefa = (v: any) => {
    setFechaNacimiento(v);
  };

  const steps = [
    "Registro",
    "Principales hallazgos",
    "Empleos",
    "Prueba veritas",
    "Normas y puntos de vista",
    "Confesiones",
    "Prueba de confianza",
    "Entrevista",
    "Fuentes de información",
    "Relevantes",
    "Conclusión",
    "Recomendaciones",
    "Evidencia",
  ];

  const handleFilterChange1 = (v: string) => {
    setUnidadOperativa(v);
  };

  const handleFilterChange2 = (v: string) => {
    setMes(v);
  };

  useLoadFilter(4, setListUO);
  useLoadFilter(1, setLisMeses);

  const handleSendlist = async () => {
    setShow(true);

    let data = {
      NUMOPERACION: 5,
      CHID: id,
      CHUSER: JSON.parse(desencrypta(JSON.parse(String(getItem("l5"))))),
      PrincipalHa: PrincipalHa.replace(/[\u0080-\uFFFF]/g, ""),
      PruebaVe: PruebaVe.replace(/[\u0080-\uFFFF]/g, ""),
      Normas: Normas.replace(/[\u0080-\uFFFF]/g, ""),
      Confesiones: Confesiones.replace(/[\u0080-\uFFFF]/g, ""),
      PruebaConfianza: PruebaConfianza.replace(/[\u0080-\uFFFF]/g, ""),
      Entrevista: Entrevista.replace(/[\u0080-\uFFFF]/g, ""),
      FuentesInf: FuentesInf.replace(/[\u0080-\uFFFF]/g, ""),
      Relevantes: Relevantes.replace(/[\u0080-\uFFFF]/g, ""),
      Conclusion: Conclusion.replace(/[\u0080-\uFFFF]/g, ""),
      Recomendacion: Recomendacion.replace(/[\u0080-\uFFFF]/g, ""),
    };

    const res = await Servicios.Inteligencia(data);
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
  function enCambioFile(event: any) {
    if (
      event?.target?.files[0] &&
      event.target.files[0].type.split("/")[0] == "image"
    ) {
      setURLRuta(URL.createObjectURL(event?.target?.files[0]));
      setNombreArchivo(event?.target?.value?.split("\\")[2]);
      let file = event?.target!?.files[0]!;
      setNewVideo(file);
    } else {
      Swal.fire("¡No es una imagen!", "", "warning");
    }
  }

  const handleVer = (ids: string) => {
    let data = {
      CHID: ids,
    };

    Servicios.GetImageInteligencia(data).then((res) => {
      if (res.SUCCESS) {
        var bufferArray = base64ToArrayBuffer(String(res.RESPONSE));
        var blobStore = new Blob([bufferArray]);
        var data = window.URL.createObjectURL(blobStore);
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.href = data;
        setURLRuta(link.href);
      }
    });
  };

  const handleSend = () => {
    setShow(true);
    let formData = new FormData();
    formData.append("CHID", id);
    formData.append("NUMOPERACION", String(tipo));
    formData.append("CHUSER", getItem("id"));
    formData.append("UnidadOperativa", UnidadOperativa);
    formData.append("Dia", Dia);
    formData.append("Mes", Mes);
    formData.append("Anio", Anio);
    formData.append("Motivo", Motivo);
    formData.append("Folio", Folio);
    formData.append("Nombre", Nombre);
    formData.append("NumeroEmpleado", NumeroEmpleado);
    formData.append("Edad", Edad);
    formData.append("FechaNacimiento", String(FechaNacimiento));
    formData.append("EstadoC", EstadoC);
    formData.append("Escolaridad", Escolaridad);
    formData.append("Telefono", Telefono);
    formData.append("CURP", CURP);
    formData.append("RFC", RFC);
    formData.append("Seguro", Seguro);
    formData.append("Correo", Correo);
    formData.append("Direccion", Direccion);
    formData.append("PrincipalHa", PrincipalHa);
    formData.append("PruebaVe", PruebaVe);
    formData.append("Normas", Normas);
    formData.append("Confesiones", Confesiones);
    formData.append("PruebaConfianza", PruebaConfianza);
    formData.append("Entrevista", Entrevista);
    formData.append("FuentesInf", FuentesInf);
    formData.append("Relevantes", Relevantes);
    formData.append("Conclusion", Conclusion);
    formData.append("Recomendacion", Recomendacion);
    formData.append("FILE", newVideo);

    axios
      .post(
        process.env.REACT_APP_APPLICATION_BASE_URL + "Inteligencia2",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
            Session: JSON.parse(String(getItem("l7"))),
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data.RESPONSE);
          setid(res.data.RESPONSE.Id);
          setFolio(res.data.RESPONSE.Folio);
          AlertS.fire({
            title: "!Éxito!",
            text: "Se guardó el registro",
            icon: "success",
          });
          setShow(false);
        } else {
          setShow(false);
          AlertS.fire({
            title: "¡Error!",
            text: "Sin respuesta",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setShow(false);
        AlertS.fire({
          title: "¡Error!",
          text: "Ocurrió un error al enviar los datos",
          icon: "error",
        });
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
      setMotivo(dt.Motivo);
      setFolio(dt.Folio);
      setNombre(dt.Nombre);
      setNumeroEmpleado(dt.NumeroEmpleado);
      setEdad(dt.Edad);
      setFechaNacimiento(dayjs(dt.FechaNacimiento));
      setEstadoC(dt.EstadoC);
      setEscolaridad(dt.Escolaridad);
      setTelefono(dt.Telefono);
      setCURP(dt.CURP);
      setRFC(dt.RFC);
      setSeguro(dt.Seguro);
      setCorreo(dt.Correo);
      setDireccion(dt.Direccion);
      setPrincipalHa(dt.PrincipalHa || "");
      setPruebaVe(dt.PruebaVe || "");
      setNormas(dt.Normas || "");
      setConfesiones(dt.Confesiones || "");
      setPruebaConfianza(dt.PruebaConfianza || "");
      setEntrevista(dt.Entrevista || "");
      setFuentesInf(dt.FuentesInf || "");
      setRelevantes(dt.Relevantes || "");
      setConclusion(dt.Conclusion || "");
      setRecomendacion(dt.Recomendacion || "");
      setURLRuta(dt.Foto);
      handleVer(dt.Id);
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
        <Box>
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
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <Grid container spacing={1} xs={12} sm={12} md={12} lg={12}>
                    <Grid item xs={3} sm={3} md={3} lg={4}>
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
                    <Grid item xs={12} sm={6} md={4} lg={2}>
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
                  <Grid container spacing={1} xs={12} sm={12} md={12} lg={12}>
                    <Grid item xs={9} sm={9} md={9} lg={9}>
                      <Typography sx={{ fontFamily: "sans-serif" }}>
                        Motivo Investigación:
                      </Typography>
                      <TextField
                        required
                        margin="none"
                        value={Motivo}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(v) => setMotivo(v.target.value)}
                        size="small"
                        style={{ height: "40px" }}
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
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
                  </Grid>
                  <Grid container spacing={1} xs={12} sm={12} md={12} lg={12}>
                    <Grid item xs={9} sm={9} md={9} lg={9}>
                      <Typography sx={{ fontFamily: "sans-serif" }}>
                        Nombre Completo:
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
                    <Grid item xs={3} sm={3} md={3} lg={3}>
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
                  </Grid>
                  <Grid container spacing={1} xs={12} sm={12} md={12} lg={12}>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <Typography sx={{ fontFamily: "sans-serif" }}>
                        Edad:
                      </Typography>
                      <TextField
                        required
                        margin="none"
                        value={Edad}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(v) => setEdad(v.target.value)}
                        size="small"
                        style={{ height: "40px" }}
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <CustomizedDate
                        value={FechaNacimiento}
                        label={"Fecha de Nacimiento"}
                        onchange={handleFilterChangefa}
                      ></CustomizedDate>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <Typography sx={{ fontFamily: "sans-serif" }}>
                        Estado Civil:
                      </Typography>
                      <TextField
                        required
                        margin="none"
                        value={EstadoC}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(v) => setEstadoC(v.target.value)}
                        size="small"
                        style={{ height: "40px" }}
                        autoComplete="off"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} xs={12} sm={12} md={12} lg={12}>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <Typography sx={{ fontFamily: "sans-serif" }}>
                        Escolaridad:
                      </Typography>
                      <TextField
                        required
                        margin="none"
                        value={Escolaridad}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(v) => setEscolaridad(v.target.value)}
                        size="small"
                        style={{ height: "40px" }}
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <Typography sx={{ fontFamily: "sans-serif" }}>
                        Teléfono:
                      </Typography>
                      <TextField
                        required
                        margin="none"
                        value={Telefono}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(v) => setTelefono(v.target.value)}
                        size="small"
                        style={{ height: "40px" }}
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <Typography sx={{ fontFamily: "sans-serif" }}>
                        CURP:
                      </Typography>
                      <TextField
                        required
                        margin="none"
                        value={CURP}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(v) => setCURP(v.target.value.toUpperCase())}
                        size="small"
                        style={{ height: "40px" }}
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <Typography sx={{ fontFamily: "sans-serif" }}>
                        RFC:
                      </Typography>
                      <TextField
                        required
                        margin="none"
                        value={RFC}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(v) => setRFC(v.target.value.toUpperCase())}
                        size="small"
                        style={{ height: "40px" }}
                        autoComplete="off"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} xs={12} sm={12} md={12} lg={12}>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <Typography sx={{ fontFamily: "sans-serif" }}>
                        Núm. Seguro Social:
                      </Typography>
                      <TextField
                        required
                        margin="none"
                        value={Seguro}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(v) => setSeguro(v.target.value)}
                        size="small"
                        style={{ height: "40px" }}
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <Typography sx={{ fontFamily: "sans-serif" }}>
                        Correo Electrónico:
                      </Typography>
                      <TextField
                        required
                        margin="none"
                        value={Correo}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(v) => setCorreo(v.target.value)}
                        size="small"
                        style={{ height: "40px" }}
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <Typography sx={{ fontFamily: "sans-serif" }}>
                        Dirección:
                      </Typography>
                      <TextField
                        required
                        margin="none"
                        value={Direccion}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(v) => setDireccion(v.target.value)}
                        size="small"
                        style={{ height: "40px" }}
                        autoComplete="off"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                  <Grid
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                  >
                    <Box boxShadow={3}>
                      <input
                        id="imagencargada"
                        accept="image/*"
                        onChange={(v) => {
                          enCambioFile(v);
                        }}
                        type="file"
                        style={{
                          zIndex: 2,
                          opacity: 0,
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          cursor: "pointer",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "374px",
                          width: "296px",
                          overflow: "hidden",
                        }}
                      >
                        {URLruta === "" ? (
                          <AddPhotoAlternateIcon
                            sx={{ width: "90%", height: "90%" }}
                          />
                        ) : (
                          <img
                            src={URLruta}
                            alt="Archivo"
                            style={{
                              width: "100%",
                              height: "auto",
                            }}
                          />
                        )}
                      </div>
                    </Box>
                  </Grid>
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
                    Principales hallazgos:
                  </Typography>

                  <Textarea
                    style={{
                      height: "350px",
                      width: "100%",
                      overflow: "auto",
                    }}
                    value={PrincipalHa}
                    onChange={(v) => setPrincipalHa(v.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <VisorDocumentossub
                    IdRegistro={id}
                    Modulo={"Inteligencia"}
                    Tipo={"PrincipalHa"}
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
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography
                    sx={{ fontFamily: "sans-serif", textAlign: "center" }}
                  >
                    Listado de Empleos
                  </Typography>
                  <Empleos idInteligencia={id}></Empleos>
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
                    Prueba veritas:
                  </Typography>

                  <Textarea
                    style={{
                      height: "350px",
                      width: "100%",
                      overflow: "auto",
                    }}
                    value={PruebaVe}
                    onChange={(v) => setPruebaVe(v.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <VisorDocumentossub
                    IdRegistro={id}
                    Modulo={"Inteligencia"}
                    Tipo={"PruebaVe"}
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
                    Normas y puntos de vista:
                  </Typography>

                  <Textarea
                    style={{
                      height: "350px",
                      width: "100%",
                      overflow: "auto",
                    }}
                    value={Normas}
                    onChange={(v) => setNormas(v.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <VisorDocumentossub
                    IdRegistro={id}
                    Modulo={"Inteligencia"}
                    Tipo={"Normas"}
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
                    Confesiones:
                  </Typography>

                  <Textarea
                    style={{
                      height: "350px",
                      width: "100%",
                      overflow: "auto",
                    }}
                    value={Confesiones}
                    onChange={(v) => setConfesiones(v.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <VisorDocumentossub
                    IdRegistro={id}
                    Modulo={"Inteligencia"}
                    Tipo={"Confesiones"}
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
                    Prueba de confianza:
                  </Typography>

                  <Textarea
                    style={{
                      height: "350px",
                      width: "100%",
                      overflow: "auto",
                    }}
                    value={PruebaConfianza}
                    onChange={(v) => setPruebaConfianza(v.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <VisorDocumentossub
                    IdRegistro={id}
                    Modulo={"Inteligencia"}
                    Tipo={"PruebaConfianza"}
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
                    Entrevista:
                  </Typography>

                  <Textarea
                    style={{
                      height: "350px",
                      width: "100%",
                      overflow: "auto",
                    }}
                    value={Entrevista}
                    onChange={(v) => setEntrevista(v.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <VisorDocumentossub
                    IdRegistro={id}
                    Modulo={"Inteligencia"}
                    Tipo={"Entrevista"}
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
                    Fuentes de información:
                  </Typography>

                  <Textarea
                    style={{
                      height: "350px",
                      width: "100%",
                      overflow: "auto",
                    }}
                    value={FuentesInf}
                    onChange={(v) => setFuentesInf(v.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <VisorDocumentossub
                    IdRegistro={id}
                    Modulo={"Inteligencia"}
                    Tipo={"Fuentes de informacion"}
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
                    Modulo={"Inteligencia"}
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
                    Modulo={"Inteligencia"}
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
                    Recomendaciones:
                  </Typography>

                  <Textarea
                    style={{
                      height: "350px",
                      width: "100%",
                      overflow: "auto",
                    }}
                    value={Recomendacion}
                    onChange={(v) => setRecomendacion(v.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <VisorDocumentossub
                    IdRegistro={id}
                    Modulo={"Inteligencia"}
                    Tipo={"Recomendacion"}
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
                    Modulo={"Inteligencia"}
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

export default InteligenciaModa;
