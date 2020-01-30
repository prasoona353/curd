import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { UsersComponent } from './users/users.component';
import { CommentsComponent } from './comments/comments.component';
import { TodoComponent } from './todo/todo.component';


const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path : '',
        component: UsersComponent
      },
      {
        path : 'comments',
        component: CommentsComponent
      },
      {
        path: 'todo',
        component : TodoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
