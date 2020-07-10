import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private user: User;
  authChange = new Subject<boolean>();

  constructor(private router: Router) {

  }
  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully('/training', true);
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully('/training', true);
  }

  logout() {
    this.user = null;
    this.authSuccessfully('/login', false);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessfully(link: string, status: boolean) {
    this.router.navigate([link]);
    this.authChange.next(status);
  }
}
