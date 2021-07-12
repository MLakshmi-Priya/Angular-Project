import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import { DatalistService, LoginForm } from '../datalist.service';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: LoginForm[]=[];
  loginForm !: FormGroup;
  constructor(private datalistService: DatalistService,
  private router: Router) { }

  ngOnInit(): void {
    // this.datalistService.getLogin().subscribe(data=>this.login=data);
    this.loginForm= new FormGroup({
      email:new FormControl(null,[
        Validators.required,
        Validators.email,
        Validators.minLength(6),
      ]),
      password: new FormControl(null,[
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }
  onSubmit(){
    if(this.loginForm.invalid){
      console.log("wrong one");
    }
    this.datalistService.login(this.loginForm.value).subscribe(
      res =>{
        console.log(res),
        this.router.navigate(['home']),
        localStorage.setItem('token', res.token)
      },
      err=> { console.log(err);

        // if(err instanceof HttpErrorResponse){
        //   if (err.status === 401){
        //     this.router.navigate(['/register'])
        //   }
        // }
      }
    );
    // this.loggedIn=true;

  }


}
