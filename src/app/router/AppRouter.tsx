import { Navigate, Route, Routes } from "react-router-dom";
import { Bienvenido } from "../views/Bienvenido";
import Inicio from "../views/Inicio";
import { Analisis } from "../views/layers/analisis/analisis";
import { Confianza } from "../views/layers/confianza/confianza";
import { Inteligencia } from "../views/layers/inteligencia/inteligencia";
import { Veritas } from "../views/layers/veritas/veritas";
import { Investigacion } from "../views/layers/investigacion/investigacion";
import { Usuarios } from "../views/layers/usuarios/usuarios";
import { loadRol } from "../hook/roles";
import { getItem } from "../services/localStorage";
import ChangePassword from "../views/share/changePassword";
import { desencrypta } from "../helpers/cifrado";

export const AppRouter = () => {
  loadRol();
  let flag;
  let user;
  try {
    flag = getItem("l1");
    user = JSON.parse(desencrypta(JSON.parse(String(getItem("l2"))))) as any;
  } catch (error) {
    console.error("Error al procesar los datos:", error);
  }

  return (
    <>
      <Inicio>
        <Routes>
          <Route
            path="/inicio"
            element={flag ? <Bienvenido /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/investigacion"
            element={flag ? <Investigacion /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/inteligencia"
            element={flag ? <Inteligencia /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/analisis"
            element={flag ? <Analisis /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/confianza"
            element={flag ? <Confianza /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/veritas"
            element={flag ? <Veritas /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/usuarios"
            element={flag ? <Usuarios /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/cp"
            element={
              flag ? (
                <ChangePassword usuario={user} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          ></Route>
        </Routes>
      </Inicio>
    </>
  );
};
