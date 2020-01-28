import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path : '',
        component: UsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
