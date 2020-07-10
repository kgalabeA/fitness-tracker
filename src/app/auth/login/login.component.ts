import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }
  onLogin(form:NgForm){
    if(form.invalid){
      return;
    }
    this.auth.login({
      email:form.value.email,
      password:form.value.password
    })

  }
}
