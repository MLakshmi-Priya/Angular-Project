import { Component, OnInit } from '@angular/core';
import { DatalistService } from '../datalist.service';
import {FormGroup,FormControl,Validators,AbstractControl,FormBuilder} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { map } from 'rxjs/operators';


class CustomValidators{
  static passwordContainsNumber(control: AbstractControl): Validators{
    const regex = /\d\d/;
    console.log(control);

    if(regex.test(control.value)&&control.value!==null){
      return true ;
    }
    else {
      return {passwordInvalid: true};
    }
  }

  static passwordMatch (control: AbstractControl): Validators{

    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;
    console.log(control);

     if((password !== null) && (passwordConfirm !== null) && (password === passwordConfirm) ){
       return true;
     }
     else {
        return { passwordsNotMaching: true };
      }
     // if(password !== null || passwordConfirm !== null || password !== passwordConfirm ){
     //   return !null;
     // }
   }

 }


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   registerForm !: FormGroup;

  constructor(private datalistService: DatalistService,
  private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm=this.fb.group({
      name:[null,[Validators.required]],
      username: [null,[Validators.required]],
      email:[null,[
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]],
      password: [null,[
        Validators.required,
        Validators.minLength(6),
        CustomValidators.passwordContainsNumber
      ]],
      passwordConfirm:[null,[
        Validators.required,
      ]]
    },{
        validator: CustomValidators.passwordMatch
      }

    )
  }

  onSubmit(){
    console.log(this.registerForm);
    if(this.registerForm.invalid){
      return;
    }
    console.log(this.registerForm.value);
    this.datalistService.register(this.registerForm.value).subscribe(
      res => {
        console.log(res),
        this.router.navigate(['login']),
        localStorage.setItem('token', res.token)

      },
      err=> console.log(err)


    );
  }
}
