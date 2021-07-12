import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import  {CseComponent } from './cse/cse.component';
import  {EceComponent } from './ece/ece.component';
import  { EeeComponent }from "./eee/eee.component";
import  { MechComponent }from "./mech/mech.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:"full"},
  {path :'home', component: HomeComponent,
  canActivate: [AuthGuard]
},
  {path :'cse', component: CseComponent, canActivate: [AuthGuard]},
  {path:'ece', component: EceComponent, canActivate: [AuthGuard] },
  {path:'eee', component: EeeComponent, canActivate: [AuthGuard] },
  {path:'mech', component: MechComponent,canActivate: [AuthGuard] },
  {path:'login', component: LoginComponent },
  {path:'register', component: RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routinComponet=[HomeComponent,CseComponent,EceComponent,EeeComponent,MechComponent,LoginComponent,RegisterComponent];
