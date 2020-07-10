import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  maxDate;
  constructor(private authService:AuthService) {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

  }

  ngOnInit(): void {

  }
  onSubmit(form: NgForm) {

    if (form.invalid) {
      console.log('Invalid');
      return;
    }
    this.authService.registerUser({
      email:form.value.email,
      password:form.value.passoword
    });

  }
}
