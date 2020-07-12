import { UIService } from './../shared/ui.service';
import { TrainingService } from './../training/training.service';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthService {

  private user;
  authChange = new Subject<boolean>();

  constructor(private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService) { }

  initAuthListener() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.user = user.refreshToken;
        this.authSuccessfully('/training', true);
      } else {
        this.trainingService.cancelSub();
        this.user = null;
        this.authSuccessfully('/login', false);
      }
    })
  }
  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.auth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(
      res => {
        this.uiService.loadingStateChanged.next(false);
        this.authSuccessfully('/training', true);
      }).catch(err => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(err.message,null,3000);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.auth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.uiService.loadingStateChanged.next(false);
      }).catch(err => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(err.message,null,3000);
      })
  }

  logout() {
    this.auth.auth.signOut();
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
