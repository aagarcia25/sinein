import { post, postDoc, postFile } from "./apiServiceExt";

export class Servicios {
  public static async login(data: any) {
    return await post("login", data);
  }

  public static async ChangePassword(data: any) {
    return await post("ChangePassword", data);
  }

  public static async logout(data: any) {
    return await post("logout", data);
  }

  public static async logoutuser(data: any) {
    return await post("logoutuser", data);
  }

  public static async obtenerDoc(data: any) {
    return await postDoc("obtenerDoc", data);
  }

  public static async selectores(data: any) {
    return await post("selectores", data);
  }

  public static async Investigacion(data: any) {
    return await post("Investigacion", data);
  }
  public static async Inteligencia(data: any) {
    return await post("Inteligencia", data);
  }
  public static async Analisis(data: any) {
    return await post("Analisis", data);
  }
  public static async Prueba(data: any) {
    return await post("Prueba", data);
  }
  public static async Veritas(data: any) {
    return await post("Veritas", data);
  }
  public static async FilesAdmin(data: any) {
    return await post("FilesAdmin", data);
  }

  public static async informes(data: any) {
    return await post("informes", data);
  }

  public static async GetDocumento(data: any) {
    return await post("GetDocumento", data);
  }

  public static async usuarios(data: any) {
    return await post("usuarios", data);
  }
}
