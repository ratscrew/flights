import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AircraftsService {

  constructor(private http: HttpClient) { }

  getAircrafts(){
    return this.http.get('https://infinite-dawn-93085.herokuapp.com/aircrafts').toPromise()
  }


}
