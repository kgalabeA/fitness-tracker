import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit,OnDestroy {

  @Output() sideNavToggle= new EventEmitter<void>();
  isAuth=false;
  authSubscription:Subscription

  constructor( private authService:AuthService) { }

  ngOnInit(): void {

    this.authSubscription=this.authService.authChange.subscribe(authStatus =>{
      this.isAuth=authStatus;
    })
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }
  logout(){
    this.authService.logout();
  }

  onClose(){
this.sideNavToggle.emit();
  }
}
