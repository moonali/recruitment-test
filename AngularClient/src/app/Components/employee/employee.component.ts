import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeServicesService } from '../../Shared/employee-services.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employee: any = [];
  public employeeDetail: any = [];
  public Editvalue: boolean | undefined;

  hideSharedLinkCopyMessage: boolean = false;

  updateEmployeeForm !: FormGroup;

  constructor(private services: EmployeeServicesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.services.refreshNeeded$.subscribe(() => {
      this.getEmployee();
    })
    this.getEmployee();

    this.updateEmployeeForm = this.formBuilder.group({
      Name: [null, [Validators.required]],
      Value: [null, Validators.required],
    });
  }
  getEmployee() {
    return this.services.getEmployee()
      .subscribe(result => this.employee = result)
  };
  getEmployeeById(id: any, edit: boolean) {
    this.Editvalue = edit;
    return this.services.getEmployeeDetails(id)
      .subscribe(result => { this.employeeDetail = result },
        error => {
          console.log(error);
      });
  };
  deleteEmployee(id: any) {
    this.Editvalue = false;
    this.services.deleteEmployees(id).subscribe((result) => {
      this.ngOnInit();
    });
  }
  updateEmployee(data: any) {
    this.services.updateEmployee(data).subscribe((data: {}) => {
      this.hideSharedLinkCopyMessage = true;
      setTimeout(() => {
        this.hideSharedLinkCopyMessage = false;
      }, 2000);
     
    });
  }

}
