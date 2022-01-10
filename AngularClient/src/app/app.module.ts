import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { EmployeeServicesService } from './Shared/employee-services.service';

import { HttpClientModule } from '@angular/common/http';
import { AddemployeeComponent } from './Components/employee/addemployee.component';
import { ReactiveFormsModule, NgForm, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AddemployeeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [EmployeeServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
