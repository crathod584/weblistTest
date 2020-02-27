import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { HelperService } from '../../../core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginButtonDisable: boolean = false;
  errorMsg:string;
  unsubscribeAll = new Subject();

  constructor(private fb: FormBuilder, private helperService: HelperService, private router: Router, private loginService: LoginService) {
    let currentUser = this.helperService.getData('currentUser');

    if (currentUser && currentUser['token'] != undefined){
           this.router.navigate(['home']);
    }

    this.createForm();
  }
  
  ngOnInit() { 
  }

  get f() { return this.loginForm.controls; }
  
  createForm() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  
  /**
  * @method - login
  * @desc - login methode for check user authentication
  */
  login() {
    this.errorMsg = null;
    this.loginButtonDisable = true;

    if(this.loginForm.value.email && this.loginForm.value.password){ 
      let loginCredential = JSON.parse(JSON.stringify(this.loginForm.value))
      this.loginService.login(loginCredential)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe( 
        (res) => {
           console.log(res)
          this.helperService.setData('currentUser',res);  
          this.loginButtonDisable = false;
          if(this.helperService.redirectUrl){
           this.router.navigate([this.helperService.redirectUrl]);      
          }else{
           this.router.navigate(['home']);      
          }

        }, 
        (err) => {
          this.loginButtonDisable = false;
            this.errorMsg = err;     
        });
    }else{
      this.loginButtonDisable = false;
    }  
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
