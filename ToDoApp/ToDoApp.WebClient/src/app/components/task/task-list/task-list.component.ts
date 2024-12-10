import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TaskAddComponent } from "../task-add/task-add.component";
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, TaskAddComponent, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {
  @ViewChild(TaskAddComponent) taskAddComponent!: TaskAddComponent;
  @ViewChild(TaskFormComponent) taskFormComponent!: TaskFormComponent;

  tasks: Task[] = [];
  private destroy$ = new Subject<void>();

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTasks(): void {
    this.taskService.getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
        this.tasks = tasks.reverse();
      });
  }

  onRemoveTask(id: number, event: Event): void {
    event.stopPropagation();

    this.taskService.deleteTask(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      });
  }

  onOpenTaskFormModal(id: number) {
    if(this.taskFormComponent){
      this.taskFormComponent.showModal(id);
    }
  }

  onOpenTaskAddModal() {
    if (this.taskAddComponent) {
      this.taskAddComponent.showModal();
    }
  }

  onCompleteTask(id: number, event: Event): void {
    event.stopPropagation();

    let task = this.tasks.find(task => task.id == id);

    if (task) {
      task!.isCompleted = !task.isCompleted;

      this.taskService.updateTask(id, task!)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
  }

  onAddTask(task: Task): void {
    this.tasks = [task, ...this.tasks];
  }

  onUpdateTask(task: Task): void {
    this.tasks.map((elem, index, array) => {
      if(task.id == elem.id){
        array[index] = task;
      }
    });
  }
}