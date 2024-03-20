export interface SelectValues {
  value: string;
  label?: string;
}

export interface IResItem {
  RESPONSE: any;
  SUCCESS: any;
  NUMCODE: any;
  STRMESSAGE: any;
}

export interface IRoles {
  Id: string;
  Descripcion: string;
  ControlInterno: string;
  Deleted: string;
  UltimaActualizacion: string;
  FechaCreacion: string;
  ModificadoPor: string;
  CreadoPor: string;
}

export interface IEmpleos {
  id: string;
  IdInteligencia: string;
  Empresa: string;
  Puesto: string;
  Fecha: string;
  Duracion: string;
  CV: string;
  CVform: string;
  LinkeId: string;
  IMSS: string;
  Form: string;
  Carta: string;
  MotivoSalida: string;
  isNew: false;
}
