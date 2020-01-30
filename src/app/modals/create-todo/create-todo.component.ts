import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validationService';
import { CreateCommentComponent } from '../create-comment/create-comment.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  todoForm: FormGroup;
  constructor(protected fb: FormBuilder,
    private validationService: ValidationService,
    public dialogRef: MatDialogRef<CreateCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.todoForm = fb.group({
      title: ["", [Validators.required]],
      completed: [true, [Validators.required]],
      id: [""],
    });
  }

  ngOnInit() {
    if(this.data && this.data.title){
      this.todoForm.get('title').setValue(this.data.title);
      this.todoForm.get('completed').setValue(this.data.completed);
      this.todoForm.get('id').setValue(this.data.id);
    }
  }

  createTodo() {
    console.log(this.todoForm)
    if(this.validationService.validateForm(this.todoForm)){ return; }
    this.dialogRef.close(this.todoForm.value)
  }
  getErrorMessage() {
    return this.todoForm.get('email').hasError('required') ? 'You must enter a value' :
    this.todoForm.get('email').hasError('email') ? 'Not a valid email' :
            '';
  }

}
