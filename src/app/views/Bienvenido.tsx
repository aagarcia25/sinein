import { Grid } from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { CardC } from "./share/Card";
import { useEffect, useState } from "react";
import { Servicios } from "../services/Servicios";
import Swal from "sweetalert2";
import { AlertS } from "../helpers/AlertS";

interface DataType {
  ct: number;
  TIPO: string;
}

export const Bienvenido = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [char1, setChar1] = useState<[]>([]);

  const datosGrasficas = async (tipo: number) => {
    let data = {
      NUMOPERACION: tipo,
    };

    Servicios.Graficas(data).then((res) => {
      if (res.SUCCESS) {
        if (tipo == 1) {
          setData(res.RESPONSE);
        } else if (tipo == 2) {
          setChar1(res.RESPONSE);
        }

        console.log(data);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    datosGrasficas(1);
    datosGrasficas(2);
  }, []);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={4} lg={2} style={{ height: "250px" }}>
          {data.length > 0 && (
            <CardC
              name={"Investigación"}
              descripcion={"Registros Generados"}
              valor={String(data[2].ct)}
            ></CardC>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={2} style={{ height: "250px" }}>
          {data.length > 0 && (
            <CardC
              name={"Inteligencia"}
              descripcion={"Registros generadas"}
              valor={String(data[1].ct)}
            ></CardC>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={2} style={{ height: "250px" }}>
          {data.length > 0 && (
            <CardC
              name={"Análisis"}
              descripcion={"Registros Generados"}
              valor={String(data[0].ct)}
            ></CardC>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={2} style={{ height: "250px" }}>
          {data.length > 0 && (
            <CardC
              name={"Prueba de Confianza"}
              descripcion={"Registros Generados"}
              valor={String(data[4].ct)}
            ></CardC>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={2} style={{ height: "250px" }}>
          {data.length > 0 && (
            <CardC
              name={"Veritas"}
              descripcion={"Registros Generados"}
              valor={String(data[3].ct)}
            ></CardC>
          )}
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        paddingTop={"10px"}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {char1.length > 0 && (
            <PieChart
              series={[
                {
                  data: char1,
                },
              ]}
              width={800}
              height={350}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
