import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api:HttpClient) { }

  getProduct(){
    return this.api.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }
}
