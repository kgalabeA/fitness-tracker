import { map } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UIService } from '../shared/ui.service';


@Injectable()
export class TrainingService {

  private availableExercises: Exercise[] = [];
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercises = new Subject<Exercise[]>();
  private runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();
  private fbSub:Subscription[]=[];

  constructor(private db: AngularFirestore,private uiService: UIService) { }

  allExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(exercise => exercise.id === selectedId);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: 'completed' });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  getRunnunfExercise() {
    return { ...this.runningExercise };
  }
  fetchCompletedExercises() {
    this.fbSub.push(this.db.collection('finishedExercises').valueChanges().subscribe((res:Exercise[])=>{
      this.finishedExercises.next(res);
    },error=>{
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackbar('Fetching exercises failed, Please try again after few seconds',null,3000);
    }))
  }

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSub.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()['name'],
            duration: doc.payload.doc.data()['duration'],
            calories: doc.payload.doc.data()['calories']
          };
        });
      }))
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
        this.uiService.loadingStateChanged.next(false);
      },error=>{
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar('Fetching exercises failed, Please try again after few seconds',null,3000);
      }));
  }
cancelSub(){
  this.fbSub.forEach(sub=>sub.unsubscribe());
}
  private addDataToDatabase(exercise:Exercise){
    this.db.collection('finishedExercises').add(exercise);
  }

}
