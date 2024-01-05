import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRouter } from "./app/router/AppRouter";
import { Plogin } from "./app/views/Plogin";

function App() {
  /*  useEffect(() => {
    // Redirección de HTTP a HTTPS
    if (
      window.location.protocol !== "https:" &&
      window.location.hostname !== "localhost"
    ) {
      window.location.href =
        "https://" + window.location.hostname + window.location.pathname;
    }

   

    if (window.location.hostname !== "localhost") {
      const bloquearClickDerecho = (e: MouseEvent) => {
        e.preventDefault();
      };
      // Agregar el escucha de evento para el click derecho en el montaje del componente
      window.addEventListener("contextmenu", bloquearClickDerecho);
      // Remover el escucha de evento cuando el componente se desmonta
      return () => {
        window.removeEventListener("contextmenu", bloquearClickDerecho);
      };
    }
  }, []);*/

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/sinein" element={<Plogin />} />
          <Route path="/sinein/*" element={<AppRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
