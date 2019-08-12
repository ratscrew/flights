/**
 * Interface for the 'Flights' data
 */
export interface FlightsEntity {
  id: string; // Primary ID
  departuretime:number,
  arrivaltime:number,
  readable_departure:string,
  readable_arrival:string,
  origin:string,
  destination:string
}
