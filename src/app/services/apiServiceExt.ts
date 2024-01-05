import axios from "axios";

import { getHeaderInfo } from "./tokenCreator";
import { desencryptaback, encryptalaravel } from "../helpers/cifrado";
import { IResItem } from "../interfaces/Share";
/**
 * MANEJO AUTOMATICO DE PETICIONES
 *
 * ADOLFO ANGEL GARCIA 10/08/2022
 */
const handleResponseDoc = (response: any) => {
  let rs;
  rs = {
    RESPONSE: response.data.RESPONSE,
    SUCCESS: response.data.SUCCESS,
    NUMCODE: response.data.NUMCODE,
    STRMESSAGE: response.data.STRMESSAGE,
  };
  return rs;
};
const handleResponse = (response: any) => {
  let rs: IResItem = {
    RESPONSE: "",
    SUCCESS: false,
    NUMCODE: 0,
    STRMESSAGE: "",
  };

  if (response.status == 429) {
    localStorage.clear();
    rs = {
      RESPONSE: "",
      SUCCESS: false,
      NUMCODE: 429,
      STRMESSAGE: "Demasiados Intentos, Cuenta Bloqueada por 10 minutos",
    };
  }

  try {
    const result: IResItem = JSON.parse(desencryptaback(response)) as any;
    rs = {
      RESPONSE: result.RESPONSE,
      SUCCESS: result.SUCCESS,
      NUMCODE: result.NUMCODE,
      STRMESSAGE: result.STRMESSAGE,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return rs;
};

export const post = async function (url: string, body: any) {
  let header = await getHeaderInfo();
  try {
    let resp = await axios.post(
      process.env.REACT_APP_APPLICATION_BASE_URL + url,
      {
        b: encryptalaravel(JSON.stringify(body)),
      },
      header
    );
    return handleResponse(resp.data);
  } catch (err: any) {
    return handleResponse(err.response);
  }
};

export const postDoc = async function (url: string, body: any) {
  let header = await getHeaderInfo();
  try {
    let resp = await axios.post(
      process.env.REACT_APP_APPLICATION_BASE_URL + url,
      body,
      header
    );
    return handleResponseDoc(resp);
  } catch (err: any) {
    return handleResponseDoc(err.response);
  }
};

export const postFile = async function (url: string, body: any) {
  let header = await getHeaderInfo();
  let resp = await axios.post(
    process.env.REACT_APP_APPLICATION_BASE_URL + url,
    body,
    header
  );
  return resp;
};
