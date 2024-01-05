import { useEffect } from "react";
import { Servicios } from "../services/Servicios";

export const useLoadFilter = (operacion: number, setTipoPruebas: any) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = { NUMOPERACION: operacion };
        const res = await Servicios.selectores(data);
        setTipoPruebas(res.RESPONSE);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [operacion, setTipoPruebas]);
};
