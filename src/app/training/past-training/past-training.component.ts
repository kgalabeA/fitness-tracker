import { Subscription } from 'rxjs';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit ,AfterViewInit,OnDestroy{

  displayedColumns = ['name', 'duration', 'calories', 'state', 'date'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  private exChangedSubcription:Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exChangedSubcription= this.trainingService.finishedExercises.subscribe((exercises:Exercise[])=>{
      this.dataSource.data=exercises;
    })
    this.trainingService.fetchCompletedExercises();
  }

  ngAfterViewInit(){
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }
  doFilter(filter:string){
    this.dataSource.filter=filter.trim().toLowerCase();
  }

  ngOnDestroy(){
    this.exChangedSubcription.unsubscribe();
  }
}
