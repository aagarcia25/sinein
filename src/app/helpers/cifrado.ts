import CryptoJS from "crypto-js";

export function encrypta(data: string) {
  const encryptedData = CryptoJS.AES.encrypt(data, "SICAIN").toString();
  return encryptedData;
}

export function desencrypta(data: string) {
  const decryptedData = CryptoJS.AES.decrypt(data, "SICAIN").toString(
    CryptoJS.enc.Utf8
  );
  return decryptedData;
}

export function desencryptaback(data: string) {
  const decryptedMessage = atob(data);
  return decryptedMessage;
}

// Función para cifrar datos
export function encryptalaravel(data: any) {
  const encryptedData = btoa(data);
  return encryptedData;
}
