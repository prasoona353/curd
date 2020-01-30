import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ValidationService } from '../../services/validationService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.scss"]
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  constructor(protected fb: FormBuilder,
    private validationService: ValidationService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.userForm = fb.group({
      name: ["", [Validators.required, Validators.pattern("[a-zA-Z _]*")]],
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    console.log(this.data)
    if(this.data){
      this.userForm.get('name').setValue(this.data.name);
      this.userForm.get('username').setValue(this.data.username);
      this.userForm.get('email').setValue(this.data.email);
    }
  }

  createUser() {
    if(this.validationService.validateForm(this.userForm)){ return; }
    this.dialogRef.close(this.userForm.value)
  }
  getErrorMessage() {
    return this.userForm.get('email').hasError('required') ? 'You must enter a value' :
    this.userForm.get('email').hasError('email') ? 'Not a valid email' :
            '';
  }
}
