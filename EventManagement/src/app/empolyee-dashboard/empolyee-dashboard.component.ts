import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from '../api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-empolyee-dashboard',
  templateUrl: './empolyee-dashboard.component.html',
  styleUrls: ['./empolyee-dashboard.component.css']
})
export class EmpolyeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelobj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilber: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })
    this.getAllEmployee();
  }

  clickAddEMployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

    postEmployeeDetails(){
      this.employeeModelobj.firstName = this.formValue.value.firstName;
      this.employeeModelobj.lastName = this.formValue.value.lastName;
      this.employeeModelobj.email = this.formValue.value.email;
      this.employeeModelobj.mobile = this.formValue.value.mobile;
      this.employeeModelobj.salary = this.formValue.value.salary;


      this.api.postEmployee(this.employeeModelobj)
      .subscribe(res=>{
        console.log(res);
        alert("Employee Added Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
      err=>{
        alert("Something went Wrong");
      })
    }

    getAllEmployee(){
      this.api.getEmployee()
      .subscribe(res=>{
        this.employeeData = res;
      })
    }

    deleteEmployee(row: any){
      this.api.deleteEmployee(row.id)
      .subscribe(res=>{
        alert("Employee Deleted")
        this.getAllEmployee();
      })

      
    }

    onEdit(row : any){
      this.showAdd = false;
      this.showUpdate = true;
      this.employeeModelobj.id = row.id;
      this.formValue.controls['firstName'].setValue(row.firstName);
      this.formValue.controls['lastName'].setValue(row.lastName);
      this.formValue.controls['email'].setValue(row.email);
      this.formValue.controls['mobile'].setValue(row.mobile);
      this.formValue.controls['salary'].setValue(row.salary);
     
    }

    updateEmployeeDetails(){
      this.employeeModelobj.firstName = this.formValue.value.firstName;
      this.employeeModelobj.lastName = this.formValue.value.lastName;
      this.employeeModelobj.email = this.formValue.value.email;
      this.employeeModelobj.mobile = this.formValue.value.mobile;
      this.employeeModelobj.salary = this.formValue.value.salary;

      this.api.updateEmployee(this.employeeModelobj, this.employeeModelobj.id)
      .subscribe(res=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      })
    }


}
