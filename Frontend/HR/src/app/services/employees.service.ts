import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee-interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  
  apiUrl : string = "https://localhost:44324/api/Employees";
  constructor(private _http : HttpClient){

  }

  getAll(){

    let params = new HttpParams();
    params = params.set("PositionId","");
    params = params.set("EmployeeName","");
    params = params.set("IsActive","");

    return this._http.get(this.apiUrl + "/GetAll", {params});
  }

  getManagers(employeeId?: number){
    let params = new HttpParams();
    params = params.set("employeeId", employeeId ?? ""); // employeeId != null? employeeId : ""
    return this._http.get(this.apiUrl + "/GetManagersList", {params});
  }

  add(employee : Employee){
    return this._http.post(this.apiUrl + "/Add", employee);
  }

  update(employee : Employee){
    return this._http.put(this.apiUrl + "/Update", employee);
  }

}
