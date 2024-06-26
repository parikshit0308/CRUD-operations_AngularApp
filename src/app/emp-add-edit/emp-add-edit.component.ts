import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {

  empForm: FormGroup;

  education: string[] = [

    'Garib',
    'Thoda Garib',
    'Average',
    'Thoda Amir',
    'Amir',
  ];

  constructor(private _fb: FormBuilder, 
              private _empService: EmployeeService,
              public dialogRef: MatDialogRef<EmpAddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
              ){
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      amiri: '',
      company: '',
      experience: '',
      package: '',      
    })
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data) {
        this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee Details Updated');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee Added Successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
    }
  }

}
