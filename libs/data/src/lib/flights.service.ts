import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private http: HttpClient) { }

  getFlightsChunck(offset = 0,limit = 25){
    return this.http.get("https://infinite-dawn-93085.herokuapp.com/flights",{params:{offset:offset.toString(),limit:limit.toString()}}).toPromise()
  }

  $getFlights(){
    
    return new Observable((_s)=>{
      let totalFlightsCount = 0;
      let flights:any[] = [];
      const me = this; // set me to the class to provide loccal access to the class
      me.getFlightsChunck(0,25).then((_data:any) => {
        totalFlightsCount = _data.pagination.total;
        flights = new Array(totalFlightsCount) 
        _data.data.forEach((item,i)=>{ 
          flights[i+_data.pagination.offset] = item; // in order to perserve order set flights in order using offset 
        })
        for (let i = 25; i < totalFlightsCount; i+= 25) { 
          
          me.getFlightsChunck(i,25).then((__data:any) => { // get all data chuncks in parallel 
            __data.data.forEach((item,j)=>{
              flights[j+__data.pagination.offset] = item; // in order to perserve order set flights in order using offset 
            })

            const _flights = flights.filter(_item => !!_item) // filter to return an array off all the items returned only
            const progress = _flights.length/totalFlightsCount // percent complete

            _s.next({progress,flights:_flights}) // fire progress to give realtime feedback as loading
            if(progress === 1) _s.complete();  // all flights have been loaded
          })
        }
      })
    
    })

    
  }
}
