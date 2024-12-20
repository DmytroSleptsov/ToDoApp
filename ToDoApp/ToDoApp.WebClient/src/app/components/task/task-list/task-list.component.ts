import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TaskAddComponent } from "../task-add/task-add.component";
import { TaskFormComponent } from '../task-form/task-form.component';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project.service';
import { ProjectAddComponent } from "../../project/project-add/project-add.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    TaskAddComponent,
    TaskFormComponent,
    ProjectAddComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {
  @ViewChild(TaskAddComponent) taskAddComponent!: TaskAddComponent;
  @ViewChild(TaskFormComponent) taskFormComponent!: TaskFormComponent;
  @ViewChild(ProjectAddComponent) projectAddComponent!: ProjectAddComponent;

  projects: Project[] = [];
  tasks: Task[] = [];

  tasksByProject: { [projectId: number]: Task[] } = {};

  private destroy$ = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadProjects();
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
        this.loadTasksByProjects();
      });
  }

  loadProjects(): void {
    this.projectService.getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe((projects) => {
        this.projects = projects
      });
  }

  loadTasksByProjects() {
    this.tasksByProject = {};
    this.tasks.forEach(task => {
      if (!this.tasksByProject[task.projectId]) {
        this.tasksByProject[task.projectId] = [];
      }
      this.tasksByProject[task.projectId].push(task);
    });
  }

  onRemoveTask(id: number, event: Event): void {
    event.stopPropagation();

    this.taskService.deleteTask(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
          this.tasks = this.tasks.filter(t => t.id !== id);
          this.tasksByProject[task.projectId] = this.tasksByProject[task.projectId]?.filter(t => t.id !== id);
        }
      });
  }

  onRemoveProject(id: number, event: Event): void {
    this.projectService.deleteProject(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.projects = this.projects.filter(project => project.id !== id);
      });
  }

  onOpenTaskFormModal(id: number) {
    if (this.taskFormComponent) {
      this.taskFormComponent.showModal(id);
    }
  }

  onOpenTaskAddModal(projectId: number) {
    if (this.taskAddComponent) {
      this.taskAddComponent.showModal(projectId);
    }
  }

  onOpenProjectAddModal() {
    if (this.projectAddComponent) {
      this.projectAddComponent.showModal();
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
    if (!this.tasksByProject[task.projectId]) {
      this.tasksByProject[task.projectId] = [];
    }

    this.tasksByProject[task.projectId] = [task, ...this.tasksByProject[task.projectId]];
  }

  onUpdateTask(task: Task): void {
    this.tasks.map((elem, index, array) => {
      if (task.id == elem.id) {
        array[index] = task;
      }
    });
  }

  onAddProject(project: Project): void {
    this.projects.push(project);
  }

  trackById(index: number, item: { id: number }): number {
    return item.id;
  }
}