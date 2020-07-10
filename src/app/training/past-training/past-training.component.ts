import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit ,ViewChild, AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit ,AfterViewInit{

  displayedColumns = ['name', 'duration', 'calories', 'state', 'date'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getCompletedExercises();
  }

  ngAfterViewInit(){
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }
  doFilter(filter:string){
    this.dataSource.filter=filter.trim().toLowerCase();
  }
}
