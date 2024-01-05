import { Button, Grid, TextField, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Progress from "./Progress";
import { Servicios } from "../../services/Servicios";
import { AlertS } from "../../helpers/AlertS";
import { encryptalaravel } from "../../helpers/cifrado";
import { useNavigate } from "react-router-dom";

const ChangePassword = ({ usuario }: { usuario: any }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [IsValid, setIsValid] = useState(true);

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

  const verifypassword = (e: any) => {
    const ver = e.target.value;
    setConfirmPassword(ver);
    console.log(ver);
    if (ver === newPassword) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };
  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);

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

  const handleSubmit = () => {
    setShow(true);
    let data = {
      CHID: usuario.Id,
      p1: currentPassword,
      p2: newPassword,
    };

    Servicios.ChangePassword(data).then(async (res) => {
      console.log(res);
      if (res.SUCCESS) {
        AlertS.fire({
          title: "!Exito!",
          text: "Se Actualizo la Contraseña, se cerrara su session por seguridad",
          icon: "success",
        });
        const data = {
          id: encryptalaravel(usuario.Id),
        };

        const res = await Servicios.logout(data);
        if (res.SUCCESS) {
          localStorage.clear();
          navigate("/sinein");
        } else {
          throw new Error("No response from the server");
        }

        setShow(false);
      } else {
        setShow(false);
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    console.log("se imprime el usuario");
    console.log(usuario);
  }, []);

  return (
    <>
      <Progress open={show}></Progress>
      <Grid
        container
        item
        spacing={1}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "2%" }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography sx={{ fontFamily: "sans-serif" }}>
            Contraseña actual:
          </Typography>
          <TextField
            required
            margin="none"
            value={currentPassword}
            type="password"
            fullWidth
            size="small"
            variant="outlined"
            onChange={(v) => setCurrentPassword(v.target.value)}
            autoComplete="off"
            onPaste={(e) => e.preventDefault()} // Prevenir la acción de pegar
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography sx={{ fontFamily: "sans-serif" }}>
            Nueva Contraseña:
          </Typography>
          <TextField
            required
            margin="none"
            value={newPassword}
            type="password"
            fullWidth
            size="small"
            variant="outlined"
            onChange={handlePasswordChange}
            autoComplete="off"
            onPaste={(e) => e.preventDefault()} // Prevenir la acción de pegar
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
            Confirmar Contraseña:
          </Typography>
          <TextField
            required
            margin="none"
            value={confirmPassword}
            type="password"
            fullWidth
            size="small"
            variant="outlined"
            onChange={verifypassword}
            error={IsValid}
            helperText={IsValid ? "Las Contraseñas No son iguales" : ""}
            autoComplete="off"
            onPaste={(e) => e.preventDefault()} // Prevenir la acción de pegar
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Button
            onClick={() => handleSubmit()}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={IsValid}
          >
            Cambiar Contraseña
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ChangePassword;
