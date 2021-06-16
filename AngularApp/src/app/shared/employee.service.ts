import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';

//import { map } from 'rxjs/operator';
//import { toPromise } from 'rxjs/operator';

import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee = new Employee;
  employees: Employee[] = [];
  readonly baseURL = "http://localhost:3000/employee";

  constructor(private http : HttpClient) { }

  postEmployee(emp: Employee){
    return this.http.post(this.baseURL, emp);
  }

  getEmployeeList(){
    return this.http.get(this.baseURL);
  }

  putEmployee(emp: Employee){
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteEmployee(_id: string){
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
