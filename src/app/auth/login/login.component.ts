import { Subscription } from 'rxjs';
import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  loadingSubs: Subscription;
  constructor(private auth: AuthService, private uiService: UIService) { }

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(res => {
      this.isLoading = res;

    })
  }
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.auth.login({
      email: form.value.email,
      password: form.value.password
    })

  }
  ngOnDestroy() {
    if(this.loadingSubs){
    this.loadingSubs.unsubscribe();
    }
  }
}
