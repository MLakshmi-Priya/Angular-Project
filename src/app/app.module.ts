import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatalistService } from './datalist.service';
import  { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule,routinComponet } from './app-routing.module';
import { AppComponent } from './app.component';
import{ HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EeeComponent } from './eee/eee.component';
import { MechComponent } from './mech/mech.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    routinComponet,
    EeeComponent,
    MechComponent,
    DetailsComponent,
    LoginComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  providers: [DatalistService,AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
