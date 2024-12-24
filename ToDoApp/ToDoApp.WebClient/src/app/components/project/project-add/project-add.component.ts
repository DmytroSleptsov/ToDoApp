import {
  AfterViewInit, Component, ElementRef,
  EventEmitter, OnDestroy, Output, ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project.service';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-project-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-add.component.html',
  styleUrl: './project-add.component.scss'
})
export class ProjectAddComponent implements OnDestroy, AfterViewInit {
  projectForm: FormGroup;
  private destroy$ = new Subject<void>();
  @ViewChild('projectAddModal') projectAddModal!: ElementRef;
  @Output() dataSubmitted = new EventEmitter<Project>();

  private modalInstance: any;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService
  ) {
    this.projectForm = this.createProjectForm();
  }

  ngAfterViewInit(): void {
    this.initializeModal();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      let project: Project = this.projectForm.value;
      this.projectService.createProject(project)
        .pipe(takeUntil(this.destroy$))
        .subscribe((project) => {
          this.dataSubmitted.emit(project);
          this.modalInstance.hide();
          this.resetForm();
        });
    }
  }

  showModal(): void {
    this.resetForm();
    this.modalInstance?.show();
  }

  resetForm(): void {
    this.projectForm.reset({
      name: ''
    });

    this.projectForm.markAsPristine();
    this.projectForm.markAsUntouched();
    this.projectForm.updateValueAndValidity();
  }

  private createProjectForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  private initializeModal(): void {
    if (this.projectAddModal?.nativeElement) {
      this.modalInstance = new bootstrap.Modal(this.projectAddModal.nativeElement);
    }
  }
}
