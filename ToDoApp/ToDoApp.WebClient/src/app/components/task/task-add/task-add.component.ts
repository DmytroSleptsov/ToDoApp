import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';

import { Task } from '../../../models/task.model';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.scss'
})
export class TaskAddComponent implements OnDestroy {
  taskForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
  ) {
    this.taskForm = formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      isCompleted: [false]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      let task: Task = this.taskForm.value;
      this.taskService.createTask(task)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() =>
          this.router.navigate([''])
        );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}