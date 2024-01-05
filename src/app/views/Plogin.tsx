import LoginIcon from "@mui/icons-material/Login";
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/img/backgroundImg.jpg"; // Importa la imagen desde tu carpeta assets

import logo from "../assets/img/logop.png";
import { AlertS } from "../helpers/AlertS";
import { encrypta } from "../helpers/cifrado";
import { Servicios } from "../services/Servicios";
import { setItem } from "../services/localStorage";
import Progress from "./share/Progress";

export const Plogin = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [slideropen, setslideropen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const login = () => {
    setslideropen(true);
    let data = {
      nombreUsuario: username,
      Password: pass,
    };

    Servicios.login(data).then((res) => {
      console.log(res);
      if (res.SUCCESS) {
        if (res.RESPONSE.login) {
          setItem(true, "l1");
          setItem(encrypta(JSON.stringify(res.RESPONSE.User)), "l2");
          setItem(encrypta(JSON.stringify(res.RESPONSE.Roles)), "l3");
          setItem(encrypta(JSON.stringify(res.RESPONSE.User.Id)), "l5");
          navigate("/sinein/inicio");
        } else {
          AlertS.fire({
            title: "¡Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
        }
        setslideropen(false);
      } else {
        setslideropen(false);
        AlertS.fire({
          title: "¡Error!",
          text: "Sin Respuesta",
          icon: "error",
        });
      }
    });
  };

  return (
    <div>
      <Progress open={slideropen}></Progress>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // Cambiar a sx=
            backgroundImage: `url(${backgroundImg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor:
              theme.palette.mode === "light" // Cambiar a theme.palette.mode
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={1}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              paddingTop: "20px",
              textAlign: "center", // Centra el texto horizontalmente
            }}
          >
            <img src={logo} alt="Descripción de la imagen" />
          </Box>
          <Typography
            variant={isSmallScreen ? "subtitle1" : "h5"}
            sx={{
              textAlign: "center", // Centra el texto horizontalmente
              margin: "20px",
            }}
          >
            SISTEMA DE INVESTIGACION E INTELIGENCIA
          </Typography>

          <LoginIcon color="error" />
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="email"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={(v) => setUsername(v.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={pass}
              onChange={(v) => setPass(v.target.value)}
            />
            {/* <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Remember me"
          /> */}
            <Button
              fullWidth
              variant="contained"
              color="error"
              sx={{
                marginTop: "20px", // Agregar margen superior
              }}
              onClick={login}
              disabled={!(username.trim() !== "" && pass.trim() !== "")}
            >
              Ingresar
            </Button>
            {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
            {/* <Box mt={5}>
            <Copyright />
          </Box> */}
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
