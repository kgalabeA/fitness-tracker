import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TrainingService } from './../training.service';
import { Exercise } from './../exercise.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[] = [];
  trainingSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingService.allExercises();
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    //this.trainingSubscription.unsubscribe();
  }
}
