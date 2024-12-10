import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddbookComponent } from './addbook/addbook.component';
import { ViewbookComponent } from './viewbook/viewbook.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { IssuebookComponent } from './issuebook/issuebook.component';
import { IssuestudentComponent } from './issuestudent/issuestudent.component';
import { ReturnbookComponent } from './returnbook/returnbook.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

export const routes: Routes = [
   {path:'login',component:LoginComponent},
   {path:'signup-form',component:SignupComponent},
   {path:'dashboard',component:DashboardComponent, canActivate: [AuthGuard]},
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   {path:'dashboard/add-book',component:AddbookComponent},
   {path:'dashboard/book-details',component:ViewbookComponent},
   {path:'dashboard/add-student',component:AddstudentComponent},
   {path:'dashboard/issue-book',component:IssuebookComponent},
   {path:'dashboard/issue-student',component:IssuestudentComponent},
   {path:'dashboard/return-book',component:ReturnbookComponent},
   {path:'forgot-password',component:ForgotpasswordComponent},
   { path: '**', redirectTo: '/login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }