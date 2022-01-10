import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError, } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { EmployeeComponent } from '../Components/employee/employee.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServicesService {
  private Url: string = 'http://localhost:41478/EmployeesCrud/';
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private httpRequest: HttpClient) { }
    private httpOptions: any = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };

  // Display List of Employees
  getEmployee(): Observable<EmployeeComponent[]> {
    return this.httpRequest.get<EmployeeComponent[]>(this.Url +'employee');
  };

  // Add new Employee
  AddEmployee(employee: any){
    var dataToPost = { "Name": employee.Name, "Value": employee.Value};
    return this.httpRequest.post(this.Url+'employee/', dataToPost, this.httpOptions)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  // Get Employee Details 
  getEmployeeDetails(id: any): Observable<any> {
    return this.httpRequest.get<EmployeeComponent>(this.Url + 'employee/' + id);
  };

  // Delete Employee  
  deleteEmployees(id: any) {
    return this.httpRequest.delete(this.Url + 'employee/' + id);
  };

  // Update Employee 
  updateEmployee(employee: any) {
    var dataToPut = { "Id": employee.Id, "Name": employee.Name, "Value": employee.Value };
    return this.httpRequest.put(this.Url + 'employeeUpdate/' + employee.Id, dataToPut, this.httpOptions)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }
}
