import { useEffect, useState } from "react";
import ModalForm from "../../share/ModalForm";
import Progress from "../../share/Progress";
import CloseIcon from "@mui/icons-material/Close";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useLoadFilter } from "../../../hook/select";
import { SelectValues } from "../../../interfaces/Share";
import { Servicios } from "../../../services/Servicios";
import { AlertS } from "../../../helpers/AlertS";
import { getItem } from "../../../services/localStorage";
import SelectFrag from "../../share/SelectFrag";
import { Dayjs } from "dayjs";
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
  const [listopcion, setlistopcion] = useState<SelectValues[]>([]);
  const [id, setid] = useState("");
  const [Lugar, setLugar] = useState("");
  const [Dia, setDia] = useState("");
  const [Mes, setMes] = useState("");
  const [Anio, setAnio] = useState("");
  const [Tipo, setTipo] = useState("");
  const [Hechos, setHechos] = useState("");
  const [Estatus, setEstatus] = useState("");
  const [Observacion, setObservacion] = useState("");
  const [FolioInterno, setFolioInterno] = useState("");
  const [ListLugares, setListLugares] = useState<SelectValues[]>([]);
  const [LisMeses, setLisMeses] = useState<SelectValues[]>([]);
  const [LisEstatus, setLisEstatus] = useState<SelectValues[]>([]);
  const [Actualizacion, setActualizacion] = useState<Dayjs | null>();

  const handleFilterChangefna = (v: any) => {
    setActualizacion(v);
  };

  const handleFilterChange1 = (v: string) => {
    setLugar(v);
  };

  const handleFilterChange2 = (v: string) => {
    setMes(v);
  };

  const handleFilterChange3 = (v: string) => {
    setEstatus(v);
  };

  const handleSend = () => {
    setShow(true);
    let data = {
      CHID: id,
      NUMOPERACION: tipo,
      Lugar: Lugar,
      Dia: Dia,
      Mes: Mes,
      Anio: Anio,
      Tipo: Tipo,
      Hechos: Hechos,
      Estatus: Estatus,
      Observacion: Observacion,
      Actualizacion: Actualizacion,
      FolioInterno: FolioInterno,
      CHUSER: getItem("id"),
    };

    Servicios.Analisis(data).then((res) => {
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

  useLoadFilter(5, setListLugares);
  useLoadFilter(1, setLisMeses);
  useLoadFilter(7, setLisEstatus);

  useEffect(() => {
    if (tipo === 2) {
      setid(dt.Id);
      setLugar(dt.Lugar);
      setDia(dt.Dia);
      setMes(dt.Mes);
      setAnio(dt.Anio);
      setTipo(dt.Tipo);
      setHechos(dt.Hechos);
      setEstatus(dt.Estatus);
      setObservacion(dt.Observacion);
      setActualizacion(dt.Actualizacion);
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
              <Typography sx={{ fontFamily: "sans-serif" }}>Lugar:</Typography>
              <SelectFrag
                value={Lugar}
                options={ListLugares}
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
                size="small"
                onChange={(v) => setAnio(v.target.value)}
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
                size="small"
                onChange={(v) => setFolioInterno(v.target.value)}
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
                size="small"
                onChange={(v) => setTipo(v.target.value)}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Hechos:</Typography>
              <TextField
                required
                margin="none"
                value={Hechos}
                type="text"
                fullWidth
                variant="outlined"
                size="small"
                onChange={(v) => setHechos(v.target.value)}
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CustomizedDate
                value={Actualizacion}
                label={"Actualización"}
                onchange={handleFilterChangefna}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
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
                value={Observacion}
                type="text"
                fullWidth
                variant="outlined"
                size="small"
                onChange={(v) => setObservacion(v.target.value)}
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
