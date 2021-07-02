import { Component, OnInit } from '@angular/core';
import { DatalistService } from '../datalist.service';
import {FormGroup,FormControl,Validators,AbstractControl,FormBuilder} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { map } from 'rxjs/operators';


class CustomValidators{
  static passwordContainsNumber(control: AbstractControl): Validators{
    const regex= /\d\d/;
    if(regex.test(control.value)&&control.value!==null){
      return {passwordInvalid: false} ;
    } else {
      return {passwordInvalid: true};
    }
    console.log(control);
  }


static passwordMatch (control: AbstractControl): Validators{

  const password = control.get('passsword')?.value;
  const passwordConfirm = control.get('passwordConfirm')?.value;

   if((password === passwordConfirm) && (password!==null) && (passwordConfirm!== null)){
     return {passwordsNotMaching: false};
   }else {
      return {passwordsNotMaching: true};
    }
    console.log(control);
   // if(password !== null || passwordConfirm !== null || password !== passwordConfirm ){
   //   return !null;
   // }
 }
}
// function passwordMatch(g: FormGroup){
//    return g.get('password')?.value === g.get('passwordConfirm')?.value ? null :{'mismatch': true};
// }

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
        CustomValidators.passwordMatch
      ]]
    }
    // ,{
    //     Validators: CustomValidators.passwordMatch
    //   }

    )
  }

  onSubmit(){
    if(this.registerForm.invalid){
      return;
    }
    console.log(this.registerForm.value);
    this.datalistService.register(this.registerForm.value).pipe(
      map(user=>this.router.navigate(['login']))
    ).subscribe();
  }

}
