import AddTaskIcon from "@mui/icons-material/AddTask";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../../helpers/AlertS";
import { SelectValues } from "../../../interfaces/Share";
import { Servicios } from "../../../services/Servicios";
import { getItem } from "../../../services/localStorage";
import ModalForm from "../../share/ModalForm";
import Progress from "../../share/Progress";
import SelectFrag from "../../share/SelectFrag";
import { useLoadFilter } from "../../../hook/select";
import { red } from "@mui/material/colors";
import { desencrypta } from "../../../helpers/cifrado";
export const UsuariosModal = ({
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
  const [Usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setnombre] = useState("");
  const [apellidopaterno, setapellidopaterno] = useState("");
  const [apellidomaterno, setapellidomaterno] = useState("");
  const [roles, setroles] = useState("");
  const [listaroles, setlistaroles] = useState<SelectValues[]>([]);

  const [isValidEmail, setIsValidEmail] = useState(true);

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Realiza la validación de la contraseña aquí
    const isPasswordValid = validatePassword(newPassword);

    // Construye el mensaje de error
    const errorMessages = [];
    if (newPassword.length < 8) {
      errorMessages.push("La contraseña debe tener al menos 8 caracteres.");
    }
    if (!/[A-Z]/.test(newPassword)) {
      errorMessages.push(
        "La contraseña debe contener al menos una letra mayúscula."
      );
    }
    if (!/[a-z]/.test(newPassword)) {
      errorMessages.push(
        "La contraseña debe contener al menos una letra minúscula."
      );
    }
    if (!/\d/.test(newPassword)) {
      errorMessages.push("La contraseña debe contener al menos un número.");
    }
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(newPassword)) {
      errorMessages.push(
        "La contraseña debe contener al menos un carácter especial."
      );
    }

    setPasswordError(isPasswordValid ? "" : errorMessages.join("\n"));
  };

  const validatePassword = (password: any) => {
    // Implementa tus reglas de validación de contraseña aquí
    // Por ejemplo, longitud mínima, mayúsculas, minúsculas, números, caracteres especiales, etc.
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const validateEmail = (input: any) => {
    // Expresión regular para validar un correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Actualiza el estado isValidEmail con el resultado de la validación
    setIsValidEmail(emailRegex.test(input));
  };

  const handleFilterChange1 = (v: string) => {
    setroles(v);
  };

  const handleEmailChange = (event: any) => {
    const newValue = event.target.value;

    // Actualiza el estado del correo electrónico
    setEmail(newValue);

    // Valida el correo electrónico
    validateEmail(newValue);
  };

  const handleSend = () => {
    setShow(true);
    let data = {
      CHID: id,
      NUMOPERACION: tipo,
      Usuario: Usuario,
      password: password,
      email: email,
      nombre: nombre,
      apellidopaterno: apellidopaterno,
      apellidomaterno: apellidomaterno,
      rol: roles,
      CHUSER: JSON.parse(desencrypta(JSON.parse(String(getItem("l5"))))),
    };

    Servicios.usuarios(data).then((res) => {
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

  useLoadFilter(8, setlistaroles);

  useEffect(() => {
    if (tipo === 2) {
      setid(dt.Id);
      setUsuario(dt.Usuario);
      setPassword(dt.password);
      setEmail(dt.email);
      setnombre(dt.nombre);
      setapellidopaterno(dt.apellidopaterno);
      setapellidomaterno(dt.apellidomaterno);
      setroles(dt.rol);
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
                Usuario:
              </Typography>
              <TextField
                required
                margin="none"
                value={Usuario}
                type="text"
                fullWidth
                size="small"
                variant="outlined"
                onChange={(v) => setUsuario(v.target.value)}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Contraseña:
              </Typography>
              <TextField
                required
                margin="none"
                value={password}
                type="password"
                fullWidth
                size="small"
                variant="outlined"
                onChange={handlePasswordChange}
                autoComplete="off"
              />

              {passwordError && (
                <Typography
                  variant="caption"
                  color={red}
                  sx={{ fontFamily: "sans-serif" }}
                >
                  {passwordError}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Correo Electronico:
              </Typography>
              <TextField
                required
                margin="none"
                value={email}
                type="text"
                fullWidth
                size="small"
                variant="outlined"
                onChange={handleEmailChange}
                error={!isValidEmail}
                helperText={isValidEmail ? "" : "Correo electrónico no válido"}
                autoComplete="off"
              />
            </Grid>
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Nombre</Typography>
              <TextField
                required
                margin="none"
                value={nombre}
                type="text"
                fullWidth
                size="small"
                variant="outlined"
                onChange={(v) => setnombre(v.target.value)}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Apellido Paterno
              </Typography>
              <TextField
                required
                margin="none"
                value={apellidopaterno}
                type="text"
                fullWidth
                size="small"
                variant="outlined"
                onChange={(v) => setapellidopaterno(v.target.value)}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Apellido Materno
              </Typography>
              <TextField
                required
                margin="none"
                value={apellidomaterno}
                type="text"
                fullWidth
                size="small"
                variant="outlined"
                onChange={(v) => setapellidomaterno(v.target.value)}
                autoComplete="off"
              />
            </Grid>
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Perfil</Typography>
              <SelectFrag
                value={roles}
                options={listaroles}
                onInputChange={handleFilterChange1}
                placeholder={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
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
