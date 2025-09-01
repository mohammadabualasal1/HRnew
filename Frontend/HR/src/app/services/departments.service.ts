import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
   apiUrl : string = "https://localhost:44324/api/Departments";
  constructor(private _http : HttpClient){

  }


  getDepartmentsList(){

    return this._http.get(this.apiUrl + "/GetDepartmentsList");
  }
}
