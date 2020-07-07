import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
maxDate;
  constructor() {

  const currentYear = new Date().getFullYear();
  this.maxDate=currentYear- 18;
  console.log('--------->',this.maxDate);
  }

  ngOnInit(): void {


  }
  onSubmit(form:NgForm){
    console.log(form);

  }
}
