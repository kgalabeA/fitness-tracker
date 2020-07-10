import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from './training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit,OnDestroy {

  ongoingtTraining=false;
  exerciseSubscription:Subscription;

  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.exerciseSubscription= this.trainingService.exerciseChanged.subscribe(
      exercise=>{
        if(exercise){
          this.ongoingtTraining=true;
        }else{
          this.ongoingtTraining=false;
        }
      })
  }

  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
  }

}
