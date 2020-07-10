import { TrainingService } from './../training.service';
import { StopTrainingComponent } from './stop-training.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  progressColor: string;
  timer: number;
  currentTraining: string;


  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.startOrResumeTime();
    this.currentTraining=this.trainingService.getRunnunfExercise().name;
  }

  startOrResumeTime() {
    const step = this.trainingService.getRunnunfExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      this.progressColorChange(this.progress);
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  progressColorChange(value: number) {
    if (value <= 30) {
      this.progressColor = "primary"
    }
    else if (value >= 31 && value <= 70) {
      this.progressColor = "accent";
    }
    else {
      this.progressColor = "warn";
    }
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTime();
      }

    });
  }

}
