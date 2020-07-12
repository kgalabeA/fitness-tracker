import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit ,OnDestroy{
  maxDate;
  isLoading=false;
  loadingSubs:Subscription;

  constructor(private authService:AuthService,private uiService:UIService) {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  ngOnInit(): void {
    this.loadingSubs=this.uiService.loadingStateChanged.subscribe(res=>{
      this.isLoading=res;

    })
  }
  onSubmit(form: NgForm) {

    if (form.invalid) {
      console.log('Invalid');
      return;
    }
    this.authService.registerUser({
      email:form.value.email,
      password:form.value.password
    });

  }
  ngOnDestroy(){
    this.loadingSubs.unsubscribe();
  }
}
