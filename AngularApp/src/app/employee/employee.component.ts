import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from "../shared/employee.model";

declare var M : any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService] //To inject the service class ==> Add the class inside the component array 
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm){
    if(form)
      form.reset();
    
    this.employeeService.selectedEmployee ={
      _id: "",
      name: "",
      office: "",
      salary: 0
    }
  }

  onSubmit(form: NgForm){
    if(form.value._id == ""){
      this.employeeService.postEmployee(form.value).subscribe((res) =>{
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({html: 'Employee saved sucessfully!', classes: 'rounded'});
      });
    }
    else{
      this.employeeService.putEmployee(form.value).subscribe((res) =>{
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({html: 'Employee Updated  sucessfully!', classes: 'rounded'});
      });
    }
  }

  refreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[]; //the response contains an array of details of the Emloyee collection
    });
  }

  onEdit(emp: Employee){
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm){
    if(confirm('Are you sure to delet this Record?')==true){
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({html: 'Employee Deleted  sucessfully!', classes: 'rounded'});
      });
    }
  }
}
