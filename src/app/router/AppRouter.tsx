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
  let pv=false;
  try {
    flag = getItem("l1");
    pv = getItem("l1");
    if(flag){
      user = JSON.parse(desencrypta(JSON.parse(String(getItem("l2"))))) as any;
    }else{

    }
 
  } catch (error) {
  }

  return (
    <>
      <Inicio>
        <Routes>
          <Route
            path="/inicio"
            element={
              pv ? <Navigate to="/sinein/cp" replace />  :
              flag ? <Bienvenido /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/investigacion"
            element={
              pv ? <Navigate to="/sinein/cp" replace />  :
              flag ? <Investigacion /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/inteligencia"
            element={
              pv ? <Navigate to="/sinein/cp" replace />  :
              flag ? <Inteligencia /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/analisis"
            element={
              pv ? <Navigate to="/sinein/cp" replace />  :
              flag ? <Analisis /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/confianza"
            element={
              pv ? <Navigate to="/sinein/cp" replace />  :
              flag ? <Confianza /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/veritas"
            element={
              pv ? <Navigate to="/sinein/cp" replace />  :
              flag ? <Veritas /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/usuarios"
            element={
              pv ? <Navigate to="/sinein/cp" replace />  :
              flag ? <Usuarios /> : <Navigate to="/" replace />}
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
