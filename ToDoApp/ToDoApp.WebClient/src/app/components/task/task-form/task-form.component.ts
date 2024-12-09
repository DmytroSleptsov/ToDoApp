import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from '../../../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnDestroy, AfterViewInit {
  taskForm: FormGroup;
  private destroy$ = new Subject<void>();
  @ViewChild('taskFormModal') taskFormModal!: ElementRef;
  @Output() dataSubmitted = new EventEmitter<Task>();
  private modalInstance: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
  ) {
    this.taskForm = this.createTaskForm();
  }

  ngAfterViewInit(): void {
    this.initializeModal();
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
          this.dataSubmitted.emit(task);
          this.modalInstance.hide();
          this.resetForm();
        });
    }
  }

  showModal(id: number): void {
    this.resetForm();

    this.taskService.getTask(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(task => {
        this.taskForm.patchValue(task);
      })

    this.modalInstance?.show();
  }

  resetForm(): void {
    this.taskForm.reset({
      name: '',
      description: '',
      isCompleted: false,
    });
    this.taskForm.markAsPristine();
    this.taskForm.markAsUntouched();
    this.taskForm.updateValueAndValidity();
  }

  private createTaskForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      description: [''],
      isCompleted: [false]
    });
  }

  private initializeModal(): void {
    if (this.taskFormModal?.nativeElement) {
      this.modalInstance = new bootstrap.Modal(this.taskFormModal.nativeElement);
    }
  }
}