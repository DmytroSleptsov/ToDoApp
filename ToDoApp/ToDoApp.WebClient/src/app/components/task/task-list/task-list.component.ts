import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private destroy$ = new Subject<void>();

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.taskService.getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
        this.tasks = tasks.reverse();
      });

    this.tasks = this.tasks.reverse()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRemoveTask(id: number, event: Event): void {
    event.stopPropagation();

    this.taskService.deleteTask(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      });
  }

  onOpenTask(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  onCompleteTask(id: number, event: Event): void {
    event.stopPropagation();

    let task = this.tasks.find(task => task.id == id);

    task!.isCompleted = !task!.isCompleted;
    
    this.taskService.updateTask(id, task!)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}