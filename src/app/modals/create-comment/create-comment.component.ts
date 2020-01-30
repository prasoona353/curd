import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validationService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {
  commentForm: FormGroup;
  constructor(protected fb: FormBuilder,
    private validationService: ValidationService,
    public dialogRef: MatDialogRef<CreateCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.commentForm = fb.group({
      name: ["", [Validators.required, Validators.pattern("[a-zA-Z _]*")]],
      email: ["", [Validators.required, Validators.email]],
      body: ["", [Validators.required]],
      id: [""],

    });
  }

  ngOnInit() {
    console.log(this.data)
    if(this.data){
      this.commentForm.get('name').setValue(this.data.name);
      this.commentForm.get('email').setValue(this.data.email);
      this.commentForm.get('body').setValue(this.data.body);
      this.commentForm.get('id').setValue(this.data.id);
    }
  }

  createComment() {
    if(this.validationService.validateForm(this.commentForm)){ return; }
    this.dialogRef.close(this.commentForm.value)
  }
  getErrorMessage() {
    return this.commentForm.get('email').hasError('required') ? 'You must enter a value' :
    this.commentForm.get('email').hasError('email') ? 'Not a valid email' :
            '';
  }

}
