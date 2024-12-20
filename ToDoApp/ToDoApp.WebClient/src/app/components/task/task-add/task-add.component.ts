import {
  AfterViewInit,
  Component, ElementRef, EventEmitter,
  OnDestroy, Output, ViewChild
} from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task.model';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.scss'
})
export class TaskAddComponent implements OnDestroy, AfterViewInit {
  taskForm: FormGroup;
  private destroy$ = new Subject<void>();
  @ViewChild('taskAddModal') taskAddModal!: ElementRef;
  @Output() dataSubmitted = new EventEmitter<Task>();

  private modalInstance: any;
  private projectId: number;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.createTaskForm();
    this.projectId = 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.initializeModal();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      let task: Task = this.taskForm.value;
      task.projectId = this.projectId;
      this.taskService.createTask(task)
        .pipe(takeUntil(this.destroy$))
        .subscribe((task) => {
          this.dataSubmitted.emit(task);
          this.modalInstance.hide();
          this.resetForm();
        });
    }
  }

  showModal(projectId: number): void {
    this.resetForm();
    this.modalInstance?.show();
    this.projectId = projectId;
  }

  resetForm(): void {
    this.taskForm.reset({
      name: '',
      description: '',
      isCompleted: false,
      projectId: 0
    });

    this.taskForm.markAsPristine();
    this.taskForm.markAsUntouched();
    this.taskForm.updateValueAndValidity();
  }

  private createTaskForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      isCompleted: [false],
      projectId: [0]
    });
  }

  private initializeModal(): void {
    if (this.taskAddModal?.nativeElement) {
      this.modalInstance = new bootstrap.Modal(this.taskAddModal.nativeElement);
    }
  }
}