import { desencrypta, encrypta } from "../helpers/cifrado";
import { IRoles } from "../interfaces/Share";
import { getItem, setItem } from "../services/localStorage";

export const loadRol = () => {
  try {
    const encryptedData = getItem("l3");

    // Verificar si la clave "l3" existe en localStorage
    if (!encryptedData) {
      console.error("La clave 'l3' no existe en localStorage");
      return;
    }

    const decryptedData = desencrypta(JSON.parse(String(encryptedData)));

    // Verificar si el resultado de desencriptar es nulo o indefinido
    if (!decryptedData) {
      console.error("Error al desencriptar los datos");
      return;
    }

    const roles: IRoles[] = JSON.parse(decryptedData);
    console.log(roles);

    // Verificar si existe el rol "ADMINISTRADOR"
    const administrador = roles.find(
      (rol: IRoles) => rol.ControlInterno === "ADMIN"
    );
    if (administrador) {
      setItem(encrypta("ADMIN"), "l4");
    }

    // Verificar si existe el rol "OPERATIVO"
    const operativo = roles.find(
      (rol: IRoles) => rol.ControlInterno === "OPER"
    );
    if (operativo) {
      setItem(encrypta("OPER"), "l4");
    }

    // Verificar si existe el rol "CONSULTA"
    const consulta = roles.find(
      (rol: IRoles) => rol.ControlInterno === "CONSULTA"
    );
    if (consulta) {
      setItem(encrypta("CONSULTA"), "l4");
    }
  } catch (error) {
    console.error("Error al procesar los datos:", error);
  }
};
