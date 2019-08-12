/**
 * Interface for the 'Rotations' data
 */
export interface RotationsEntity {
  id: string; // Primary ID
  date:Date;
  aircraftId: string;
  flightIds:string[];
  utilization:number;
  minGroundUtilizationTime:number,
  valed:boolean,
  highlightErrorFields:any,
  errors:{msg:string}[]
}
