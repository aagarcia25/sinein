import { Grid } from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { CardC } from "./share/Card";

export const Bienvenido = () => {
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
        <Grid item xs={12} sm={12} md={4} lg={3} style={{ height: "250px" }}>
          <CardC
            name={"Investigación"}
            descripcion={"Registros Generados"}
            valor={"1"}
          ></CardC>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} style={{ height: "250px" }}>
          <CardC
            name={"Inteligencia"}
            descripcion={"Registros generadas"}
            valor={"1"}
          ></CardC>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={6}>
          <BarChart
            series={[
              { data: [3, 4, 1, 6, 5], stack: "A", label: "Series A1" },
              { data: [4, 3, 1, 5, 8], stack: "A", label: "Series A2" },
              { data: [4, 2, 5, 4, 1], stack: "B", label: "Series B1" },
              { data: [2, 8, 1, 3, 1], stack: "B", label: "Series B2" },
              { data: [10, 6, 5, 8, 9], label: "Series C1" },
            ]}
            width={400}
            height={250}
          />
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
        <Grid item xs={12} sm={12} md={4} lg={3} style={{ height: "250px" }}>
          <CardC
            name={"Análisis"}
            descripcion={"Registros Generados"}
            valor={"1"}
          ></CardC>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} style={{ height: "250px" }}>
          <CardC
            name={"Prueba de Confianza"}
            descripcion={"Registros Generados"}
            valor={"1"}
          ></CardC>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={6}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "series A" },
                  { id: 1, value: 15, label: "series B" },
                  { id: 2, value: 20, label: "series C" },
                ],
              },
            ]}
            width={400}
            height={250}
          />
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
        <Grid item xs={12} sm={12} md={4} lg={3} style={{ height: "250px" }}>
          <CardC
            name={"Veritas"}
            descripcion={"Registros Generados"}
            valor={"1"}
          ></CardC>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={3}
          style={{ height: "250px" }}
        ></Grid>
        <Grid item xs={12} sm={12} md={4} lg={6}>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={400}
            height={250}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
