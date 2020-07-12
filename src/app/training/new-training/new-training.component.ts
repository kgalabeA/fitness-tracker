import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TrainingService } from './../training.service';
import { Exercise } from './../exercise.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[] = [];
  exerciseSubscription: Subscription;
  isLoading=false;
  loadingSubs:Subscription;

  constructor(private trainingService: TrainingService,private uiService:UIService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(res => {
      this.isLoading = res;

    })
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
    );
    this.trainingService.fetchAvailableExercises();
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    if(this.exerciseSubscription||this.loadingSubs){
    this.exerciseSubscription.unsubscribe();
    this.loadingSubs.unsubscribe();
    }
  }
}
