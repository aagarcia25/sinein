import React from "react";
import { AssignmentLate } from "@mui/icons-material";
import { CardContent, Typography, IconButton, Card } from "@mui/material";

const cardStyle = {
  backgroundColor: "#F2F3F4",
  color: "black",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  maxWidth: 350,
  height: "100%",
};

const textStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  textAlign: "center",
};

export const CardC = ({
  name,
  descripcion,
  valor,
}: {
  name: string;
  descripcion: string;
  valor: string;
}) => {
  return (
    <div>
      <Card sx={{ ...cardStyle, position: "relative" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {descripcion}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={textStyle}>
            {valor}
          </Typography>
        </CardContent>
        {/* Ajusta z-index y tamaño del IconButton */}
        <IconButton
          sx={{
            position: "absolute",
            bottom: 10, // Ajusta la posición vertical
            right: 10, // Ajusta la posición horizontal
            color: "red",
            zIndex: 1, // Aumenta el z-index
          }}
        >
          <AssignmentLate fontSize="large" />
        </IconButton>
      </Card>
    </div>
  );
};
