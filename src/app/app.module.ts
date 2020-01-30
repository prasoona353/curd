import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from './angular.material.module';
import { HttpClientModule } from '@angular/common/http';
import { CreateUserComponent } from './modals/create-user/create-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from './comments/comments.component';
import { CreateCommentComponent } from './modals/create-comment/create-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    UsersComponent,
    CreateUserComponent,
    CommentsComponent,
    CreateCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [CreateUserComponent,CreateCommentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
