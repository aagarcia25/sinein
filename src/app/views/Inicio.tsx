import CheckIcon from "@mui/icons-material/Check";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import MultilineChartIcon from "@mui/icons-material/MultilineChart";
import SearchIcon from "@mui/icons-material/Search";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import WarningIcon from "@mui/icons-material/Warning";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyIcon from "@mui/icons-material/Key";
import {
  Box,
  Container,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logos from "../assets/img/logo-jugos-del-valle.svg";
import { desencrypta, encryptalaravel } from "../helpers/cifrado";
import { Servicios } from "../services/Servicios";
import { getItem } from "../services/localStorage";
const drawerWidth: number = 280;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

interface Props {
  children?: React.ReactNode;
}

export default function Inicio({ children }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [rol, setRol] = useState("");
  const [contador, setContador] = useState(0);
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  const changepassword = async () => {
    navigate("/sinein/cp");
  };

  const logout = async () => {
    try {
      const user = JSON.parse(
        desencrypta(JSON.parse(String(getItem("l2"))))
      ) as any;

      const data = {
        id: encryptalaravel(user.Id),
      };

      const res = await Servicios.logout(data);

      if (res.SUCCESS) {
        localStorage.clear();
        navigate("/sinein");
      } else {
        throw new Error("No response from the server");
      }
    } catch (error) {
      console.error("Logout error:", error);
      Swal.fire({
        title: "¡Error!",
        text: "Ocurrió un error durante el cierre de sesión.",
        icon: "error",
      });
    } finally {
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOnIdle = () => {
    setShowExpiredModal(true);
    setContador(0);
    let contador = 5;
    const countdownInterval = setInterval(() => {
      setContador(contador);

      if (contador === 0) {
        clearInterval(countdownInterval);
        logout();
      } else {
        contador--;
      }
    }, 1000);
    // Puedes realizar acciones adicionales cuando la aplicación está inactiva
  };

  // Configuración del gancho useIdleTimer
  useIdleTimer({
    timeout: 60000 * 10, // Tiempo en milisegundos antes de considerar la aplicación inactiva
    onIdle: handleOnIdle,
    debounce: 500, // Tiempo de espera antes de considerar la aplicación inactiva después de un evento de actividad
  });

  useEffect(() => {
    try {
      setRol(desencrypta(JSON.parse(String(getItem("l4")))));
    } catch (error) {
      console.error("Error al procesar los datos:", error);
    }
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          sx={{ backgroundColor: "#F2F3F4" }}
          open={open}
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="info"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="#000000"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              SISTEMA DE INVESTIGACIÓN E INTELIGENCIA
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <img
              src={logos}
              alt="Descripción de la imagen"
              width="100"
              height="70"
              onClick={() => navigate("/sinein/inicio")} // Agrega un evento onClick
              style={{
                cursor: "pointer",
                marginRight: "20px",
              }}
            />
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon sx={{ ml: "auto" }} />
            </IconButton>
          </Toolbar>
          <Divider />

          <List component="nav">
            <ListItemButton onClick={() => navigate("/sinein/investigacion")}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Investigación" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/sinein/inteligencia")}>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="Inteligencia" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/sinein/analisis")}>
              <ListItemIcon>
                <MultilineChartIcon />
              </ListItemIcon>
              <ListItemText primary="Análisis" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/sinein/confianza")}>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="Prueba de Confianza" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/sinein/veritas")}>
              <ListItemIcon>
                <WarningIcon />
              </ListItemIcon>
              <ListItemText primary="Veritas" />
            </ListItemButton>
            {rol === "ADMIN" ? (
              <ListItemButton onClick={() => navigate("/sinein/usuarios")}>
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary="Administración de Usuarios" />
              </ListItemButton>
            ) : (
              ""
            )}
            <Divider sx={{ my: 1 }} />
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon className="IconoDentroBoton" />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión " />
            </ListItemButton>
            <ListItemButton onClick={changepassword}>
              <ListItemIcon>
                <KeyIcon />
              </ListItemIcon>
              <ListItemText primary="Cambiar Contraseña " />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
      {showExpiredModal ? (
        <div>
          <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" align="center">
              <Typography variant="h4" component="h2">
                Cierre de Sesión por inactividad
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" align="center">
                <Typography variant="h5" component="h2">
                  Por su seguridad, cerraremos la sesión
                </Typography>
                <Typography variant="h6" component="h2">
                  {contador}
                </Typography>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
