import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit, OnDestroy {

  taskForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
  ) {
    this.taskForm = formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      description: [''],
      isCompleted: [false]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.taskService.getTask(+id!)
      .pipe(takeUntil(this.destroy$))
      .subscribe(task => {
        this.taskForm.patchValue(task);
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSaveTask(): void {
    if (this.taskForm.valid) {
      let task: Task = this.taskForm.value;
      this.taskService.updateTask(task.id, task)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.router.navigate([''])
        });
    }
  }
}