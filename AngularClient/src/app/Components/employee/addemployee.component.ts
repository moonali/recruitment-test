import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeServicesService } from '../../Shared/employee-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from './employee-model';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  employeeForm !: FormGroup;
  hideSharedLinkCopyMessage: boolean = false;
  constructor(private services: EmployeeServicesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      Name: [null, [Validators.required]],
      Value: [null, Validators.required],
    });
  }
  addEmployee(data: any) {
    return this.services.AddEmployee(data).subscribe((data: {}) => {
      this.services.getEmployee();
      this.hideSharedLinkCopyMessage = true;
      setTimeout(() => {
        this.hideSharedLinkCopyMessage = false;
      }, 2000);
    });
  }
}
